import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

// const getUser = (token) => {
//   const
// }

const addLikes = async (blog, likes) => {
  const newObject = {
    likes: likes + 1,
  }
  const response = await axios.patch(baseUrl + `/${blog.id}`, newObject)
  console.log(response)
  return response.data
}
const create = async (newObject) => {
  console.log(token, 'this is the token')
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  console.log(response)
  return response.data
}

const remove = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(baseUrl + `/${blog.id}`, config)
}

export default { getAll, setToken, create, addLikes, remove }
