import React, {useState, useEffect} from 'react'
import Togglable from './Togglable'
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
  <div style={blogStyle} className="blogs">
    <div>
    {blog.title} {blog.author}
    </div>
  
    <Togglable 
      buttonLabel="view" 
      hideLabel="hide">
    <div className="url">
     {blog.url}
    </div>
    <div >
      {like} <button className="likes" onClick={handleLike}>like</button>
    </div>
    {blog?.user?.name}
    { blog.user.name === user.name ?
      <button onClick={handleRemove} className="remove">remove</button>
      : null
    }
    
    </Togglable>
  </div>
)
}
  


export default Blog
