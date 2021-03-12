import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogsDisplay from './components/BlogsDisplay'
import Notifications from './components/Notications'
import Error from './components/Error'

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
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
      setNotification(`login success`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch (exception) {
      setErrorMessage(`failed to login ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
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

  const handleSubmittedBlog = (submittedBlog) => {
    if(submittedBlog) {
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
      setNotification(`success added ${submittedBlog.title} by ${submittedBlog.author}`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }
  const handleError = (exception) => {
    setErrorMessage(`failed to create new blog ${exception.message}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
  }
 
  
  return (
    <div>
    <Error errorMessage={errorMessage} />
    <Notifications notification={notification} />
    <BlogsDisplay
     user={user}
     newBlog={newBlog}
     blogs={blogs}
     handleLogout={handleLogout}
     handleInput={handleInput}
     handleSubmittedBlog={handleSubmittedBlog}
     handleError={handleError}
    /> 
    <LoginForm
     user={user}
     username={username} 
     password={password}
     handlePassword={handlePassword}
     handleUser={handleUser}
     handleLogin={handleLogin}
     blogService={blogService} /> 
    </div>
  )
}

export default App