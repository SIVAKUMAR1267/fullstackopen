import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { likeblog, deleteblog } from '../reducers/blogsreducers'

const Blog = ({ blog }) => {
  const username = useSelector((state) => state.users)
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
    </div>
  )
}

export default Blog
