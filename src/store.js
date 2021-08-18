import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import allUsersReducer from './reducers/allUsersReducer'

const reducer = combineReducers({
  blogs: blogsReducer,
  users: userReducer,
  notifications: notificationReducer,
  allUsers: allUsersReducer,
})

const store = createStore(reducer, applyMiddleware(thunk))
export default store
