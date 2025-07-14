import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Errormessage from './components/errormessage'
import Notification from './components/message'
import Togglable from './components/togglable'
import LoginForm from './components/loginform'
import BlogForm from './components/blogform'



const App = () => {
  
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
          username, password,      
        })
        window.localStorage.setItem(        
          'loggedblogappUser', JSON.stringify(user)      
        )
        blogService.setToken(user.token)       
        setUser(user)      
        setUsername('')      
        setPassword('')    
      } catch (exception) {      
        setErrorMessage('wrong username or password')      
        setTimeout(() => {        
          setErrorMessage(null)      
        }, 5000)    
      }
    }
  

const addblog = async (blogObject) => {
  try {
    blogsFormRef.current.toggleVisibility()
    const newblog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newblog))
    setMessage(`'${blogObject.title}' by ${blogObject.author} is added to the BlogList`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  } 
  catch (error) {
    setMessage(null)
    setErrorMessage(error.response?.data?.error || 'Error adding blog')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
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
      <Notification message={message} />
      <Errormessage errormessage={errorMessage} />

      {user === null ?
  <Togglable buttonLabel='login' buttonlabel='cancel'>
  <LoginForm
    username={username}
    password={password}
    handleUsernameChange={({ target }) => setUsername(target.value)}
    handlePasswordChange={({ target }) => setPassword(target.value)}
    handleSubmit={handleLogin}
  />
</Togglable> :
      <div>
        <p>{user.name} logged-in <button onClick={handleLogout}>logout</button> </p>
        <h2>create new</h2>

    <Togglable buttonLabel='New Blog' buttonlabel='cancel' ref={blogsFormRef}>
  <BlogForm blogObject={addblog}
    />
</Togglable>
      </div>
    }
      <h2>Blogs</h2>

      

      {blogs.map(blog =>
      
        <Blog key={blog.id} blog={blog} username={user.name}/>
       
      )}
                 
              
    </div>
  )
}

export default App