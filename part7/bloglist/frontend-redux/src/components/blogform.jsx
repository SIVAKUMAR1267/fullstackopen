import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createblog } from '../reducers/blogsreducers'

const BlogForm = (user) => {
  const dispatch = useDispatch()
  const addblog = (event) => {
    event.preventDefault()
    dispatch(
      createblog({
        title: event.target.Title.value,
        author: event.target.Author.value,
        url: event.target.Url.value,
        user: user,
      })
    )
    event.target.Title.value = ''
    event.target.Author.value = ''
    event.target.Url.value = ''
  }

  return (
    <div className="formdiv">
      <form className="blogform" onSubmit={addblog}>
        <div>
          Title:
          <input type="text" name="Title" placeholder="title" />
        </div>
        <div>
          Author:
          <input type="text" name="Author" placeholder="author" />
        </div>
        <div>
          Url:
          <input type="text" name="Url" placeholder="url" />
        </div>
        <button className="button" type="submit">
          create
        </button>
      </form>
    </div>
  )
}

export default BlogForm
