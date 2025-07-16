import { useState } from 'react'
import propTypes from 'prop-types'

const BlogForm = ({ blogObject }) => {
  const [newtitle, setnewTitle] = useState('')
  const [newauthor, setnewAuthor] = useState('')
  const [newurl, setnewUrl] = useState('')
  const addblog =(event) => {
    event.preventDefault()
    blogObject ({
      title: newtitle,
      author: newauthor,
      url: newurl,
    })
    setnewTitle('')
    setnewAuthor('')
    setnewUrl('')
  }
  const handletitleChange = (event) => {
    setnewTitle(event.target.value)
  }
  const handleauthorChange = (event) => {
    setnewAuthor(event.target.value)
  }
  const handleurlChange = (event) => {
    setnewUrl(event.target.value)
  }
  return(
    <form className='blogform' onSubmit={addblog}>
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
      <button className='button' type="submit">create</button>
    </form>
  )}
BlogForm.propTypes = {
  blogObject: propTypes.func.isRequired
}

export default BlogForm