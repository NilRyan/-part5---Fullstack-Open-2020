import React from 'react'
import Blog from './Blog'

const BlogsDisplay = ({blogService, user, blogs, handleLogout, handleInput, newBlog}) => {
  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button type="button" onClick={handleLogout}>logout</button>
        <form onSubmit={(e) => {
          e.preventDefault()
          blogService.create(newBlog)}}>
        <h1>create new</h1>
        <div>
          title:
            <input 
            type="text"
            name="title"
            value={newBlog.title} 
            onChange={handleInput}>
            </input>
        </div>
        <div>
        author:
            <input 
            type="text" 
            name="author"
            value={newBlog.author} 
            onChange={handleInput}>
            </input>
        </div>
        <div>
        url:
            <input 
            type="text"
            name="url" 
            value={newBlog.url} 
            onChange={handleInput}>
            </input>
        </div>
        <button type="submit">create</button>
      </form>
        {
          blogs.map( blog =>
            <Blog key={blog.id} blog={blog}/>) 
        } 
  
      </div>
      )
  }
  return null
   
  } 

export default BlogsDisplay
