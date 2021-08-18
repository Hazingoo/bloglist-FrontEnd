import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Blog = (props) => {
  const blog = props.blog
  console.log(blog, blog.title)
  const [visible, setVisible] = useState(false)
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const buttonLabel = visible ? 'hide' : 'view'

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    props.updateBlog(updatedBlog)
  }

  const removeBlog = () => props.deleteBlog(blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <p>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} - {blog.author}{' '}
          </Link>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </p>
      </div>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          {blog.likes}{' '}
          <button id='like-button' onClick={increaseLikes}>
            like
          </button>
        </p>
        <button id='remove' onClick={removeBlog}>
          remove
        </button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
