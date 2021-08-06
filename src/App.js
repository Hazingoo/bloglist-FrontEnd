import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div>
      <h1>{message}</h1>
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState(null)
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    console.log(blogs)
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log(user, 'this is the user')
      if (!user) {
        throw new Error('Incorrect credentials')
      }
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessage('Incorrect credentials')
      console.log(message)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const showLogin = () => {
    return (
      <div>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            Username
            <input
              value={username}
              type='text'
              name='username'
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            Password
            <input
              value={password}
              type='text'
              name='password'
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    )
  }

  const handleSignIn = async (title, author, url) => {
    console.log('working, this part of the react is working')
    const data = await blogService.create({
      title,
      author,
      url,
      user: user.id,
    })
    setMessage(`a new blog ${data.title}`)
    console.log(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    console.log(data, 'this is the data')
    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  const showBlogs = () => {
    return (
      <div>
        <h2>blogs</h2>
        <div>
          {user.name}
          <button
            onClick={() => {
              setUser(null)
              window.localStorage.clear()
              blogService.setToken(null)
            }}
          >
            logout
          </button>
        </div>
        <h2>create new</h2>
        <Togglable buttonLabel='create new blog' endButtonLabel={'cancel'}>
          <BlogForm handleSignIn={handleSignIn} />
        </Togglable>
        <div id='blogs'>
          {blogs
            .slice()
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => {
              if (blog && blog.user.username === user.username) {
                return (
                  <Blog
                    key={blog.id}
                    blog={blog}
                    blogs={blogs}
                    setBlogs={setBlogs}
                  />
                )
              }
            })}
        </div>
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} />
      {user === null ? showLogin() : showBlogs()}
    </div>
  )
}

export default App
