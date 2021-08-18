import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  initializeBlogs,
  addBlogs,
  removeBlogs,
  changeBlog,
} from './reducers/blogsReducer'
import BlogView from './components/BlogView'
import { initializeUsers } from './reducers/allUsersReducer'
import { setUser } from './reducers/userReducer'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import UserList from './components/UserList'
import User from './components/User'
import { setError, setSuccess } from './reducers/notificationReducer'

const App = () => {
  const allBlogs = useSelector(({ blogs }) => blogs)
  const errorMessage = useSelector(({ notifications }) => notifications.error)
  const successMessage = useSelector(
    ({ notifications }) => notifications.success
  )
  const user = useSelector(({ users }) => users)
  const dispatch = useDispatch()
  const blogFormRef = React.createRef()

  useEffect(() => {
    console.log('This should execute')
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      dispatch(setUser(user))
      blogService.setToken(user.token)
    } catch (exception) {
      dispatch(setError('Wrong Credentials'))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
  }

  const createBlog = async (BlogToAdd) => {
    try {
      blogFormRef.current.toggleVisibility()
      await dispatch(addBlogs(BlogToAdd))
      dispatch(setSuccess(`Blog ${BlogToAdd.title} was successfully added`))
    } catch (exception) {
      dispatch(setError(`Cannot add blog ${BlogToAdd.title}`))
    }
  }

  const updateBlog = async (BlogToUpdate) => {
    try {
      dispatch(changeBlog(BlogToUpdate))
      dispatch(
        setSuccess(`Blog ${BlogToUpdate.title} was successfully updated`)
      )
    } catch (exception) {
      dispatch(setError(`Cannot update blog ${BlogToUpdate.title}`))
    }
  }

  const deleteBlog = async (BlogToDelete) => {
    try {
      if (window.confirm(`Delete ${BlogToDelete.title} ?`)) {
        dispatch(removeBlogs(BlogToDelete))
        dispatch(
          setSuccess(`Blog ${BlogToDelete.title} was successfully deleted`)
        )
      }
    } catch (exception) {
      dispatch(setError(`Cannot delete blog ${BlogToDelete.title}`))
    }
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <Router>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      {user === null ? (
        <LoginForm handleLogin={handleLogin} />
      ) : (
        <div>
          <p>
            <Link to={'/'}>blogs</Link> <Link to={'/users'}>users</Link>{' '}
            {user.name} logged in
            <button onClick={handleLogout} type='submit'>
              logout
            </button>
          </p>
          <Switch>
            <Route path='/blogs/:id'>
              <BlogView updateBlog={updateBlog} />
            </Route>
            <Route path='/users/:id'>
              <User />
            </Route>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route path='/'>
              <h2>Blog App</h2>
              <Togglable buttonLabel='Add new blog' ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
              </Togglable>
              {allBlogs.sort(byLikes).map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateBlog={updateBlog}
                  deleteBlog={deleteBlog}
                />
              ))}
            </Route>
          </Switch>
        </div>
      )}
    </Router>
  )
}

export default App
