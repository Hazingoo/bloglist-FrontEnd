import blogService from '../services/blogs'


export const initializeBlogs = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        dispatch({
            type: 'INIT_BLOGS',
            data: blogService.getAll()
        })
        blogService.setToken(user.token)
        dispatch({
            type: 'SET_USER',
            data: user
        })
        }
    }
}


const blogsReducer = (state=[], action) => {
    
    switch(action.type){
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return state.concat(action.data)
        default:
            return state
    }
}

export default blogsReducer