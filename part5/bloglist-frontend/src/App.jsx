import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Errormessage from './components/errormessage'
import Notification from './components/message'

const App = () => {
  const [newtitle, setnewTitle] = useState('')
  const [newauthor, setnewAuthor] = useState('')
  const [newurl, setnewUrl] = useState('')
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')   
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newblog, setNewBlog] = useState('')
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
  const handletitleChange = (event) => {
    setnewTitle(event.target.value)
  }
  const handleauthorChange = (event) => {
    setnewAuthor(event.target.value) 
  }
  const handleurlChange = (event) => {
    setnewUrl(event.target.value)
  }

  const blogForm = () => (
    <form onSubmit={addblog}>
      <div>
        Title:<input
          type="text"
          value={newtitle}
          name="Title"
          onChange={handletitleChange}
        />
       </div>
      <div> 
        Author:<input 
          type="text"
          value={newauthor}
          name="Author"
          onChange={handleauthorChange} 
        />
       </div>
      <div> 
        Url:<input
          type="text"
          value={newurl}
          name="Url"
          onChange={handleurlChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )

const handleblogChange = (event) => {
  setNewBlog(event.target.value)
}

const addblog = async (event) => {
  event.preventDefault()
  const blogObject = {
    title: newtitle,
    author: newauthor,
    url: newurl,
  }

  try {
    const newblog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newblog))
    setMessage(`'${newtitle}' by ${newauthor} is added to the BlogList`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setnewTitle('')
    setnewAuthor('')
    setnewUrl('')
  } catch (error) {
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
      loginForm() :
      <div>
        
        <p>{user.name} logged-in <button onClick={handleLogout}>logout</button> </p>
        <h2>create new</h2>
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