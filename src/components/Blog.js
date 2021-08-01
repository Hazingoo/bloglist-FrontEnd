import { useState } from 'react'
import React from 'react'
import Togglable from './Togglable'
import blogService from '/Users/guan_ha/Desktop/Projects/bloglist-frontend/src/services/blogs'
import PropTypes from 'prop-types'
const Blog = ({ blog, blogs, setBlogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  const [likes, setLikes] = useState(blog.likes)
  return (
    <div style={blogStyle}>
      <Togglable buttonLabel={`${blog.title} view`} endButtonLabel={'hide'}>
        {blog.title}
        <br />
        {blog.url}
        <br />
        likes {likes} <br />
        <button
          onClick={async () => {
            await blogService.addLikes(blog, likes)
            setLikes(likes + 1)
          }}
        >
          like
        </button>
        <br />
        <button
          onClick={async () => {
            if (window.confirm(`Remove blog ${blog.title}`)) {
              await blogService.remove(blog)
              setBlogs(blogs.filter((blogItem) => blogItem !== blog))
            }
          }}
        >
          remove
        </button>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
}

export default Blog
