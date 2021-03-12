import React, {useRef} from 'react'
import Blog from './Blog'
import Toggable from './Togglable'
import blogService from '../services/blogs'

const BlogsDisplay = ({ handleError, handleSubmittedBlog, user, blogs, handleLogout, handleInput, newBlog}) => {
  const createBlogRef = useRef();

  const handleSubmitBlog = async (e) => {
    e.preventDefault()
    try {
      const submittedBlog = await blogService.create(newBlog)
      createBlogRef.current.toggleVisibility();
      handleSubmittedBlog(submittedBlog);
    } catch (exception) {
      handleError(exception)
    }
    

  }
  
  if (user) {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        <button type="button" onClick={handleLogout}>logout</button>

        <Toggable buttonLabel="create new" ref={createBlogRef} >
          <form onSubmit={handleSubmitBlog}>
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
        </Toggable>
        

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
