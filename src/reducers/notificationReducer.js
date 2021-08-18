export const setSuccess = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_SUCCESS',
      data: message,
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET',
        data: null,
      })
    }, 5000)
  }
}

export const setError = (message) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_ERROR',
      data: message,
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET',
        data: null,
      })
    }, 5000)
  }
}

const notificationReducer = (
  state = {
    success: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case 'SET_SUCCESS':
      return {
        success: action.data,
        error: null,
      }
    case 'SET_ERROR':
      return {
        success: null,
        error: action.data,
      }
    case 'RESET':
      return {
        success: null,
        error: null,
      }
    default:
      return state
  }
}

export default notificationReducer
