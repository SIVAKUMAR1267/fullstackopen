import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeblog, deleteblog } from '../reducers/blogsreducers'

const Blog = ({ blog }) => {
  const username = useSelector((state) => state.users)
  const [blogVisible, setblogVisible] = useState(false)
  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  const dispatch = useDispatch()

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(likeblog(blog.id, updatedBlog))
  }
  const handledelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      dispatch(deleteblog(id))
    }
  }

  return (
    <div className="blogStyle">
      <div className="blog">
        {blog.title} - {blog.author}
        <button
          className="view"
          style={hideWhenVisible}
          onClick={() => setblogVisible(true)}
        >
          view
        </button>
        <button
          className="view"
          style={showWhenVisible}
          onClick={() => setblogVisible(false)}
        >
          hide
        </button>
      </div>
      <div style={showWhenVisible}>
        <div>
          Likes {blog.likes}
          <button className="like" onClick={() => handleLike(blog)}>
            Like
          </button>
        </div>
        <div>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </div>
        {blog.user.name}
        <div>
          {username?.username === blog.user.username ? (
            <button className="delete" onClick={() => handledelete(blog.id)}>
              Delete
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}

export default Blog
