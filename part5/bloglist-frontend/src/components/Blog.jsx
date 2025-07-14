import { useState } from 'react'

const Blog = ({ blog,username }) => {
    const [blogVisible, setblogVisible] = useState(false)
   const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }
  return(
  <div style={blogStyle}>
    <div>
    {blog.title} - {blog.author} 
      <button style={hideWhenVisible} onClick={() => setblogVisible(true)}>view</button>
      <button style={showWhenVisible} onClick={() => setblogVisible(false)}>hide</button>
    </div>
    <div style={showWhenVisible}>
  <div>
  Likes {blog.likes}<button >Like</button>
  </div>
  <div>
  Url {blog.url}
  </div>
  {username}
  </div>
  </div>
)}

export default Blog
