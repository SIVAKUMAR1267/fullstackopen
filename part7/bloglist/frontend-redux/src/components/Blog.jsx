import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeblog, deleteblog,addcomment } from '../reducers/blogsreducers'
import { useNavigate } from 'react-router-dom'
const Blog = ({ blog }) => {
  const username = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const Navigate = useNavigate()
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
      Navigate('/')
    }
  }
  const comments = blog.comments
  const addcomments = async (event,blog) => {
    event.preventDefault()
    const comments = event.target.comments.value
    event.target.comments.value = ''
    const updatedBlog = {
      ...blog,
      comments:[...blog.comments, comments],
    }
    dispatch(addcomment(blog.id, updatedBlog))
  }

  return (
    <div className="blogStyle">
      <div className="blog">
        <h3>
          {blog.title} - {blog.author}
        </h3>
      </div>
      <div>
        <div>
          <h3>
            Likes {blog.likes}{' '}
            <button className="like" onClick={() => handleLike(blog)}>
              Like
            </button>
          </h3>
        </div>
        <div>
          <h3>
            <a href={blog.url} target="_blank" rel="noopener noreferrer">
              {blog.url}
            </a>
          </h3>
        </div>
        <h3>{blog.user.name}</h3>
        <div>
          {username?.username === blog.user.username ? (
            <button className="delete" onClick={() => handledelete(blog.id)}>
              Delete
            </button>
          ) : null}
        </div>
      </div>
      <h3>Comments</h3>
      <form onSubmit={(event) => addcomments(event, blog)} >
        <input type='text' name='comments' placeholder='comments' /> <button className='button' type='submit'>Add comments</button>
      </form>
      {blog.comments.map ((b) => (
        <div key={b}>
          <ul>
            <li>{b}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}

export default Blog
