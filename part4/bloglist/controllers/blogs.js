const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blogs')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

const getTokenFrom = request => {  
  const authorization = request.get('authorization')  
  if (authorization && authorization.startsWith('Bearer ')) {    
    return authorization.replace('Bearer ', '')  
  }  
  return null
}

blogsRouter.post('/',async (request, response) => {
  body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)  
  if (!decodedToken.id) {    
    return response.status(401).json({ 
      error: 'token invalid' 
    })  
  }  
  const user = await User.findById(decodedToken.id)
  if (!user || !user._id) {    
    return response.status(401).json({ 
      error: 'token invalid' 
    })  
  }
  if (!body.title || !body.author || !body.url) {
    return response.status(400).json({ error: 'title, author and url are required' })
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  try 
  {    
    const savedblog = await blog.save() 
    user.blogs = user.blogs.concat(savedblog._id)
    await user.save()
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