import { createStore, combineReducers, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'

import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'

const reducer = combineReducers({
    blogs: blogsReducer,
    users: userReducer
  })

const store = createStore(
    reducer,
    composeWithDevTools(
      applyMiddleware(thunk)
    )
)
export default store