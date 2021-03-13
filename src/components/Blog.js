import React, {useState, useEffect} from 'react'
import Toggable from './Togglable'
import blogService from '../services/blogs'
const Blog = ({ blog}) => {
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
  const handleLike = async () => {
    setLike(like + 1);
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
    </Toggable>
  </div>
)
}
  


export default Blog
