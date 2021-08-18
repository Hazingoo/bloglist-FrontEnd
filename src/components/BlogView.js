import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { addCommentsBlogs } from '../reducers/blogsReducer'
const BlogView = ({ updateBlog }) => {
  const dispatch = useDispatch()
  const blogs = useSelector(({ blogs }) => blogs)
  const id = useParams().id
  console.log(blogs)
  const blog = blogs.find((item) => item.id === id)
  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    updateBlog(updatedBlog)
  }
  const addComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''
    await blogService.makeComment(blog.id, {
      content: comment,
    })
    const newBlog = Object.assign(blog)
    newBlog.comments = newBlog.comments.concat({
      content: comment,
    })
    console.log(newBlog, 'This is the newblog')
    dispatch(addCommentsBlogs(newBlog))
  }

  if (!blog) {
    return null
  }
  return (
    <div>
      <h2>blog app</h2>
      <h1>
        {blog.title} {blog.author}
      </h1>
      <p>
        {blog.likes} likes <button onClick={increaseLikes}>Like</button>
      </p>
      <p>added by {blog.user.name}</p>
      <h3>Comments</h3>
      <form onSubmit={addComment}>
        <div>
          <input name='comment' type='text' />
        </div>
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) => (
          <li key={blog.comments.indexOf(comment)}>{comment.content}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
