import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      console.log('this part is working')
      const user = JSON.parse(loggedUserJSON)
      const data = await blogService.getAll()
      dispatch({
        type: 'INIT_BLOGS',
        data,
      })
      blogService.setToken(user.token)
      dispatch({
        type: 'SET_USER',
        data: user,
      })
    }
  }
}

export const addCommentsBlogs = (newBlog) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_COMMENT',
      data: newBlog,
    })
  }
}
export const addBlogs = (blog) => {
  return async (dispatch) => {
    await blogService.create(blog)
    console.log(blog)
    dispatch({
      type: 'NEW_BLOG',
      data: blog,
    })
  }
}

export const removeBlogs = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: blog,
    })
  }
}

export const changeBlog = (blogUpdate) => {
  return async (dispatch) => {
    console.log(blogUpdate)
    await blogService.update(blogUpdate)
    dispatch({
      type: 'UPDATE_BLOG',
      data: blogUpdate,
    })
  }
}

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_BLOGS':
      return action.data
    case 'NEW_BLOG':
      console.log('new-blogs is working')
      return state.concat(action.data)
    case 'REMOVE_BLOG':
      console.log(action.data, state)
      return state.filter((item) => item !== action.data)
    case 'UPDATE_BLOG':
      return state.map((item) =>
        item.id !== action.data.id ? item : action.data
      )
    case 'ADD_COMMENT':
      return state.map((blog) =>
        blog.id !== action.data.id ? blog : action.data
      )
    default:
      console.log("this shouldn't happen")
      return state
  }
}

export default blogsReducer
