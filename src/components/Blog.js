import React from 'react'
import Toggable from './Togglable'
const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

return (
  <div style={blogStyle}>
    <div>
    {blog.title} {blog.author}
    </div>
  
    <Toggable buttonLabel="view" hideLabel="hide">
    {blog.url}
    <div>
    {blog.likes} <button>like</button>
    </div>
    {blog?.user?.name}
    </Toggable>
  </div>
)
}
  


export default Blog
