import React from 'react'
const CreateBlog = ({handleSubmitBlog, handleInput, newBlog}) => {
  return (
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
  )
}

export default CreateBlog
