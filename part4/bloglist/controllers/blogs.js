const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async (request, response) => { 
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/',async (request, response) => {
  body = request.body
  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({ error: 'title, author and url are required' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  try 
  {    
    const savedblog = await blog.save()    
    response.status(201).json(savedblog)  
  } 
  catch (exception) 
  {    
    next(exception)  
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  try {
    const updatedblog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedblog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogsRouter