const { test, after, beforeEach} = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get(('/api/blogs'))
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  assert(response.body[0].id)
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "New Blog",
    author: "New Author",
    url: "https://newblog.com/",
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${helper.initialUsers[0].token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('if the likes property is missing from the request, it will default to the value 0', async () => {
  const newBlog = {
    title: "New Blog without likes",
    author: "New Author",
    url: "https://newblog.com/"
  };

  const response = await api.post('/api/blogs').send(newBlog)
  assert.strictEqual(response.body.likes, 0)
});

test('if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', async () => {
  const newBlogWithoutUrl = {
    title: "New Blog without url",
    author: "New Author",
    likes: 0
  }
  await api.post('/api/blogs').send(newBlogWithoutUrl).expect(400)

  const newBlogWithoutTitle = {
    author: "New Author",
    url: "https://newblog.com/",
    likes: 0
  }
  await api.post('/api/blogs').send(newBlogWithoutTitle).expect(400)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  console.log(blogsAtStart)
  console.log(blogToDelete)
  console.log(blogToDelete.id)
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

  const titles = blogsAtEnd.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))
})

test('a blog can be updated', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)

  const blogsAtEnd = await helper.blogsInDb()
  const updatedBlogInDb = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
  assert.strictEqual(updatedBlogInDb.likes, blogToUpdate.likes + 1)
})

after(async() => {
  await mongoose.connection.close()
})