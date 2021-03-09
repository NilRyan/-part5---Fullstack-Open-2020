import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const localUser = window.localStorage.getItem('User');
    setUser(JSON.parse(localUser))
  }, [])



  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const currentUser = await loginService.login({
        username, password,
      })
      console.log(currentUser)
      window.localStorage.setItem('User', JSON.stringify(currentUser))
      setUser(currentUser)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    console.log('logout')
    setUser(null);
    window.localStorage.removeItem('User');
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        type="text"
        value={username}
        name="Username"
        onChange={({target}) => setUsername(target.value)}
        />
    </div>

    <div>
      password
        <input
        type="password"
        value={password}
        name="Password"
        onChange={({target}) => setPassword(target.value)}
        />
    </div>
    
    <button type="submit">login</button>
  </form>
  )
  const blogsDisplay = () => (
    <div>
    <h2>blogs</h2>
    <p>{user.name} logged in</p>
    <button type="button" onClick={handleLogout}>logout</button>
     {
      blogs.map( blog =>
        <Blog key={blog.id} blog={blog}/>) 
     } 
    </div>
   
    )
  
  
  return (
    <div>
      {user === null ? loginForm() :
     blogsDisplay()}
      
    </div>
  )
}

export default App