import React, {useState, useEffect} from 'react'
import Toggable from './Togglable'
import blogService from '../services/blogs'
const Blog = ({ blog, user}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [like, setLike] = useState(blog.likes);
  useEffect(() => {
    blogService.like( blog.id,
      {
        user: blog.user.id,
        likes: like,
        author: blog.author,
        title: blog.title,
        url: blog.url
      }
    ) 
  }, [like])
  const handleLike = () => {
    setLike(like + 1);
  }
  const handleRemove = async () => {
    if(window.confirm(`Would you really like to delete ${blog.title} by ${blog.author}?`)){
      blogService.deleteBlog(blog.id);
    }
  }

return (
  <div style={blogStyle}>
    <div>
    {blog.title} {blog.author}
    </div>
  
    <Toggable buttonLabel="view" hideLabel="hide">
    {blog.url}
    <div>
    {like} <button onClick={handleLike}>like</button>
    </div>
    {blog?.user?.name}
    { blog.user.name === user.name ?
      <button onClick={handleRemove}>remove</button>
      : null
    }
    
    </Toggable>
  </div>
)
}
  


export default Blog
