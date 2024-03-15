const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

const jwt = require('jsonwebtoken')


blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = request.user

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid'})
    }

    if (body.title === undefined) {
        return response.status(400).json({ error: 'title missing' })
    }
    if (body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
    }
    if (body.likes === undefined) {
        body.likes = 0
    }

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        user: user.id,
        likes: body.likes
    })

    user.blogs = user.blogs.concat(blog.id)
    await user.save()

    const savedBlog = await blog.save()
    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (decodedToken.id !== blog.user.toString()) {
        return response.status(401).json({ error: 'token invalid'})
    }
    const user = request.user

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
})

module.exports = blogsRouter