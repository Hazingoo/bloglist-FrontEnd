import axios from 'axios'
const baseUrl = '/api/login'

const login = async (credential) => {
  try {
    const response = await axios.post(baseUrl, credential)
    console.log('this part is not working')
    console.log(response)
    return response.data
  } catch (error) {
    return null
  }
}

export default { login }
