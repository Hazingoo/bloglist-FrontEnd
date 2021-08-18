import userService from '../services/users'

export const initializeUsers = () => {
  return async (dispatch) => {
    const data = await userService.getAll()
    console.log(data.data)
    dispatch({
      type: 'INIT_USERS',
      data: data.data,
    })
  }
}

const allUsersReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data
    default:
      return state
  }
}

export default allUsersReducer
