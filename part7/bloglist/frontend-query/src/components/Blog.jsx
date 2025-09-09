import { useState } from 'react'
import propTypes from 'prop-types'

const Blog = ({ blog,username , handleLike, handleDelete }) => {
  const [blogVisible, setblogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  return(
    <div className='blogStyle'>
      <div className='blog'>
        {blog.title} - {blog.author}
        <button className='view' style={hideWhenVisible} onClick={() => setblogVisible(true)}>view</button>
        <button className='view' style={showWhenVisible} onClick={() => setblogVisible(false)}>hide</button>
      </div>
      <div style={showWhenVisible}>
        <div>
          Likes {blog.likes}
          <button className='like' onClick={() => handleLike(blog)}>Like</button>
        </div>
        <div>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </div>
        {blog.user.name }
        <div>
          {username?.username === blog.user.username ?
            <button className='delete' onClick={() => handleDelete(blog.id)}>Delete</button> : null}
        </div>
      </div>

    </div>

  )
}
Blog.propTypes = {
  blog: propTypes.object.isRequired,
  username: propTypes.object,
  handleLike: propTypes.func.isRequired,
  handleDelete: propTypes.func.isRequired
}

export default Blog
