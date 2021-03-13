import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
  console.log(token)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: {Authorization: token}
  }
  const blogUrl = `${baseUrl}/${id}`
  const response = await axios.delete(blogUrl, config);
  return response.data;
}

const like = async (id, likedBlog) => {
  const blogUrl = `${baseUrl}/${id}`;
  const response = await axios.put(blogUrl, likedBlog)
  return response.data;
}

export default { getAll, setToken, create, like, deleteBlog }