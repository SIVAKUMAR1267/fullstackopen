import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newblog, setNewBlog] = useState('')

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

    const handleLogin = async (event) => {    
      event.preventDefault()        
      try {      
        const user = await loginService.login({        
          username, password,      
        })
        window.localStorage.setItem(        
          'loggedblogappUser', JSON.stringify(user)      
        )       
        setUser(user)      
        setUsername('')      
        setPassword('')    
      } catch (exception) {      
        setErrorMessage('Wrong credentials')      
        setTimeout(() => {        
          setErrorMessage(null)      
        }, 5000)    
      }
    }
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (
    <form onSubmit={addblog}>
      <div>
      </div>
      <button type="submit">create</button>
    </form>
  )

const handleblogChange = (event) => {
  setNewBlog(event.target.value)
}

const addblog = (event) => {
  event.preventDefault()
  setNewBlog('')
}
const handleLogout = () => {
  window.localStorage.removeItem('loggedblogappUser')
  setUser(null)
  blogService.setToken(null)
}
  return (
    <div>
      <h2>blogs</h2>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
      {user === null ?
      loginForm() :
      <div>
        
        <p>{user.name} logged-in <button onClick={handleLogout}>logout</button> </p>
     
        {blogForm()}
      </div>
    }
      <h2>Blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
                   
              
    </div>
  )
}

export default App