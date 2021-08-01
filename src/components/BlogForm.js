import { useState } from 'react'
import PropTypes from 'prop-types'
import React from 'react'

const BlogForm = ({ handleSignIn }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        handleSignIn(title, author, url)
      }}
    >
      <div>
        title:
        <input
          value={title}
          type="text"
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          value={author}
          type="text"
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          value={url}
          type="text"
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleSignIn: PropTypes.func.isRequired,
}

export default BlogForm
