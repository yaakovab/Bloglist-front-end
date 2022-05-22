import { useState } from 'react'



const Blog = ({ blog, likeButton }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const handleLikeButton = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    // console.log(updatedBlog)
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
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={() => setDetailsVisible(true)}>view</button>
      </div>
      <div style={showWhenVisible}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          <li>
            {blog.title} {blog.author}
            <button onClick={() => setDetailsVisible(false)}>hide</button>
          </li>
          <li>
            {blog.url}
          </li>
          <li>
            likes {blog.likes} <button onClick={handleLikeButton}>like</button>
          </li>
          <li>
            {blog.user.name}
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Blog