const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const { userExtractor } = require('../utils/middleware')
const User = require('../models/user')

blogsRouter.post('/', userExtractor, async (request, response,next) => {
  body = request.body
 
  const userid = request.userid

  if (!userid) {    
    return response.status(401).json({ 
      error: 'token invalid' 
    })
  }
  const user = await User.findById(userid)
  if (!user) {
    return response.status(401).json({
      error: 'user not found'  
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

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  const user = request.userid
  if (!user) {
    return response.status(401).json({ error: 'token invalid' })
  }
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

module.exports = blogsRouter