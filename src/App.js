import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogsDisplay from './components/BlogsDisplay'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const localUser = JSON.parse(window.localStorage.getItem('User'));

    if(localUser){
      setUser(localUser)
      blogService.setToken(localUser.token)

    }
    
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
      blogService.setToken(currentUser.token)
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

  const handleUser = (e) => {
    setUsername(e.target.value);
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
  }
  const handleInput = (e) => {
    const key = e.target.name
    setNewBlog({...newBlog, [key]: e.target.value})
  }

  
 
  console.log('render app')
  return (
    <div>
     <LoginForm
     user={user}
     username={username} 
     password={password}
     handlePassword={handlePassword}
     handleUser={handleUser}
     handleLogin={handleLogin}
     blogService={blogService} /> 

     <BlogsDisplay
     user={user}
     newBlog={newBlog}
     blogs={blogs}
     handleLogout={handleLogout}
     handleInput={handleInput}
     blogService={blogService}
    /> 
    </div>
  )
}

export default App