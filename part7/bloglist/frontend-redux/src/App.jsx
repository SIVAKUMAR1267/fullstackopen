import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initialblogs } from './reducers/blogsreducers'
import BlogList from './components/bloglist'
import { setuserfromlocalstorage } from './reducers/userreducer'
import { initializeusers } from './reducers/usersreducers'
import Users from './components/users'
import { Container } from '@mui/material'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import BlogForm from './components/blogform'
import Blog from './components/Blog'
import LoginForm from './components/loginform'
import { logoutuser } from './reducers/userreducer'
import Notification from './components/message'
import Bloguser from './components/bloguser'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.users)
  const blogusers = useSelector((state) => state.blogusers)
  const blogs = useSelector((state) => state.blogs)
  const match = useMatch('/blogs/:id')
  const matchuser = useMatch('/users/:id')


  useEffect(() => {
    dispatch(initialblogs())
    dispatch(setuserfromlocalstorage())
    dispatch(initializeusers())
  }, [dispatch])

  const padding = {
    padding: 5,
  }

  const blog = match
    ? blogs.find((b) => b.id === String(match.params.id))
    : null
  const bloguser = matchuser
    ? blogusers.find((bloguser) => bloguser.id === String(matchuser.params.id))
    : null

  return (
    <Container>
      <Notification />
      <div>
        <div>
          <Link style={padding} to="/">
            Home
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>
          {!user ? (
            <em></em>
          ) : (
            <Link style={padding} to="/create">
              Create
            </Link>
          )}
          {user ? (
            <em>
              {user.name} logged in{' '}
              <button onClick={() => dispatch(logoutuser())}>logout</button>
            </em>
          ) : (
            <Link style={padding} to="/login">
              login
            </Link>
          )}
        </div>
        <Routes>
          <Route path="/users/:id" element={<Bloguser user={bloguser} />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/" element={<BlogList />} />
          <Route path="/blogs/:id" element={<Blog blog={blog} />} />
          <Route path="create" element={<BlogForm />} />
        </Routes>
      </div>
    </Container>
  )
}

export default App
