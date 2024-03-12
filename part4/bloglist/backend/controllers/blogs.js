const blogsRouter = require('express').Router()
const { result } = require('lodash')
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
        response.json(blogs)
    })
})
  
blogsRouter.post('/', (request, response) => {
    if (request.body.title === undefined) {
        return response.status(400).json({ error: 'title missing' })
    }
    if (request.body.url === undefined) {
        return response.status(400).json({ error: 'url missing' })
    }
    if (request.body.likes === undefined) {
        request.body.likes = 0
    }
    const blog = new Blog(request.body)
    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
})

blogsRouter.delete('/:id', async (request, response) => {
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