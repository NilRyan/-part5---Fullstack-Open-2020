import React from 'react'
const LoginForm = ({ user, username, password, handleLogin, handleUser, handlePassword}) => {
  if (user === null) {
    return (
    <form onSubmit={handleLogin}>
    <div>
      username
        <input
        key="username"
        autoComplete="username"
        type="text"
        value={username}
        name="Username"
        onChange={handleUser}
        />
    </div>

    <div>
      password
        <input
        key="password"
        autoComplete="current-password"
        type="password"
        value={password}
        name="Password"
        onChange={handlePassword}
        />
    </div>
    
    <button type="submit">login</button>
  </form>
  )
  } else {
    return null
  }
  }

export default LoginForm
