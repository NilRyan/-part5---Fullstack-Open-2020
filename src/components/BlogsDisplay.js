import React, {useRef} from 'react'
import Blog from './Blog'
import Toggable from './Togglable'
import blogService from '../services/blogs'
import CreateBlog from './CreateBlog'

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
         <CreateBlog
         handleSubmitBlog={handleSubmitBlog}
         handleInput={handleInput}
         newBlog={newBlog}
        />
        </Toggable>
        
        {
          blogs
          .sort((a, b) => (b.likes - a.likes) )
          .map( blog =>
            <Blog key={blog.id} blog={blog}/>) 
        } 
  
      </div>
      )
  }
  return null
   
  } 

export default BlogsDisplay
