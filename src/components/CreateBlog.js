import React from 'react'
const CreateBlog = ({handleSubmitBlog, handleInput, newBlog}) => {
  return (
    <form onSubmit={handleSubmitBlog}>
          <h1>create new</h1>
          <div>
            title:
              <input
              data-test="title"
              id='title'
              type="text"
              name="title"
              value={newBlog.title} 
              onChange={handleInput}>
              </input>
          </div>
          <div>
          author:
              <input 
              data-test="author"
              id='author'
              type="text" 
              name="author"
              value={newBlog.author} 
              onChange={handleInput}>
              </input>
          </div>
          <div>
          url:
              <input
              data-test="url"
              id='url' 
              type="text"
              name="url" 
              value={newBlog.url} 
              onChange={handleInput}>
              </input>
          </div>
          <button data-test="create" type="submit">create</button>
        </form>
  )
}

export default CreateBlog
