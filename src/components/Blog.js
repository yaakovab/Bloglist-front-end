import { useState } from 'react'



const Blog = ({ blog, likeButton, delBlog, user }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const handleViewHideButton = () => setDetailsVisible(!detailsVisible)

  const handleLikeButton = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    likeButton(updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhenVisible = { display: detailsVisible ? 'none' : '' }
  const showWhenVisible = { display: detailsVisible ? '' : 'none' }



  return (
    <div style={blogStyle} className="blog-container">
      <div style={hideWhenVisible} className="title-author-hide-when-visible">
        {blog.title} {blog.author}
        <button onClick={handleViewHideButton}>view</button>
      </div>
      <div style={showWhenVisible} className="blog-content-show-when-visible">
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            {blog.title} {blog.author}
            <button onClick={handleViewHideButton}>hide</button>
          </li>
          <li>
            {blog.url}
          </li>
          <li>
            likes {blog.likes} <button onClick={handleLikeButton}>like</button>
          </li>
          <li>
            {user ? blog.user.name : null}
          </li>
          {user ? (user.username === blog.user.username ?
            <li>
              <button style={{ backgroundColor: 'lightblue' }} onClick={() => delBlog(blog)} >remove</button>
            </li> : null) : null}
        </ul>
      </div>
    </div>
  )
}

export default Blog