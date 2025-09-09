import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/message'
import Togglable from './components/togglable'
import LoginForm from './components/loginform'
import BlogForm from './components/blogform'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { useNotificationDispatch } from './reducers/notificationreducer'
import {
  getAll as getblogs,
  create as addblog,
  update as updateblog,
  deleteBlog as deleteblog,
} from './services/blogs'
const App = () => {
  const queryClient = useQueryClient()

  const newBlogFormRef = useRef()
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useNotificationDispatch()

  const addBlogMutation = useMutation({
    mutationFn: addblog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const loginMutation = useMutation({
    mutationFn: loginService.login,
    onSuccess: (user) => {
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch({ type: 'SET_NOTIFICATION', payload: `Welcome ${user.name}` })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const updateBlogMutation = useMutation({
    mutationFn: updateblog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  const deleteBlogMutation = useMutation({
    mutationFn: deleteblog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    dispatch({ type: 'SET_NOTIFICATION', payload: 'Logged out successfully' })
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' })
    }, 5000)
  }

  const loginUser = async (event) => {
    event.preventDefault()
    try {
      loginMutation.mutate(
        { username, password },
        {
          onSuccess: (user) => {
            setUser(user)
            setUsername('')
            setPassword('')
          },
          onError: () => {
            dispatch({
              type: 'SET_NOTIFICATION',
              payload: 'wrong username or password',
            })
            setTimeout(() => {
              dispatch({ type: 'CLEAR_NOTIFICATION' })
            }, 5000)
          },
        }
      )
    } catch (exception) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'wrong username or password',
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  const createBlog = async (blogObject) => {
    newBlogFormRef.current.toggleVisibility()
    try {
      addBlogMutation.mutate(blogObject)
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `a new blog ${blogObject.title} by ${blogObject.author} added`,
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    } catch (exception) {
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: 'error in creating a blog',
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  const handleLike = (blog) => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id ? blog.user.id : blog.user,
    }
    try {
      updateBlogMutation.mutate(updatedBlog)
      dispatch({
        type: 'SET_NOTIFICATION',
        payload: `You liked '${blog.title}' by ${blog.author}`,
      })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    } catch (exception) {
      dispatch({ type: 'SET_NOTIFICATION', payload: 'error in liking a blog' })
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  }

  const handleDelete = (id) => {
    const blog = queryClient.getQueryData(['blogs']).find((b) => b.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        deleteBlogMutation.mutate(id)
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: `Deleted blog ${blog.title} by ${blog.author}`,
        })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
      } catch (exception) {
        dispatch({
          type: 'SET_NOTIFICATION',
          payload: 'error in deleting a blog',
        })
        setTimeout(() => {
          dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, 5000)
      }
    }
  }

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: getblogs,
    refetchOnWindowFocus: false,
  })

  if (result.isPending) {
    return <div>loading data...</div>
  }
  if (result.isError) {
    return <div>blog services are not available due to server problems</div>
  }

  const blogs = result.data
  blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {user === null ? (
        <Togglable buttonLabel="login" buttonlabel="cancel">
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={loginUser}
          />
        </Togglable>
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={logoutUser}>logout</button>
          </p>
          <Togglable
            buttonLabel="new blog"
            buttonlabel="cancel"
            ref={newBlogFormRef}
          >
            <BlogForm blogObject={createBlog} />
          </Togglable>
          <br />
        </div>
      )}
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            username={user}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default App
