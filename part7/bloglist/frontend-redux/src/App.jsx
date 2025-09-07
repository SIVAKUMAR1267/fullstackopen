import { useEffect } from 'react'
import Notification from './components/message'
import { useDispatch } from 'react-redux'
import { initialblogs } from './reducers/blogsreducers'
import BlogList from './components/bloglist'
import { setuserfromlocalstorage } from './reducers/userreducer'
import Login from './components/login'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initialblogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(setuserfromlocalstorage())
  }, [dispatch])


  return (
    <div>
      <h2>Blogs</h2>
      <Notification />
      <Login />
      <BlogList />
    </div>
  )
}

export default App
