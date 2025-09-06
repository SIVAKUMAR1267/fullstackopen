import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/message'
import Togglable from './components/togglable'
import LoginForm from './components/loginform'
import BlogForm from './components/blogform'
import { setNotificationWithTimeout } from './reducers/notificationreducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  useEffect(() => {
    async function getblogs() {
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
    }
    getblogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedblogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogsFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedblogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotificationWithTimeout('wrong username or password', 5))
    }
  }

  const handleLike = async (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id ? blog.user.id : blog.user,
    }
    try {
      await blogService.update(blog.id, updatedBlog)
      const blogs = await blogService.getAll()
      blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(blogs)
      dispatch(
        setNotificationWithTimeout(
          `You liked '${blog.title}' by ${blog.author}`,
          5
        )
      )
    } catch (error) {
      dispatch(
        setNotificationWithTimeout(
          error.response?.data?.error || 'Error liking blog',
          5
        )
      )
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogService.deleteBlog(id)
        const blog = await blogService.getAll()
        blog.sort((a, b) => b.likes - a.likes)
        setBlogs(blog)
        dispatch(setNotificationWithTimeout('Blog deleted successfully', 5))
      } catch (error) {
        dispatch(
          setNotificationWithTimeout(
            error.response?.data?.error || 'Error deleting blog',
            5
          )
        )
      }
    }
  }

  const addblog = async (blogObject) => {
    try {
      blogsFormRef.current.toggleVisibility()
      await blogService.create(blogObject)
      const updatedBlogs = await blogService.getAll()
      updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
      dispatch(
        setNotificationWithTimeout(
          `'${blogObject.title}' by ${blogObject.author} is added to the BlogList`,
          5
        )
      )
    } catch (error) {
      dispatch(setNotificationWithTimeout(null, 0))
      dispatch(
        setNotificationWithTimeout(
          error.response?.data?.error || 'Error adding blog',
          5
        )
      )
    }
  }
  const handleLogout = () => {
    window.localStorage.removeItem('loggedblogappUser')
    setUser(null)
    blogService.setToken(null)
  }
  return (
    <div>
      <h2>Blogs</h2>
      <Notification />

      {user === null ? (
        <Togglable
          buttonLabel="login"
          buttonlabel="cancel"
          defaultVisible={true}
        >
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged-in{' '}
            <button className="button" onClick={handleLogout}>
              logout
            </button>{' '}
          </p>
          <h2>create new</h2>

          <Togglable
            buttonLabel="New Blog"
            buttonlabel="cancel"
            ref={blogsFormRef}
          >
            <BlogForm blogObject={addblog} />
          </Togglable>
        </div>
      )}
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          username={user}
        />
      ))}
    </div>
  )
}

export default App
