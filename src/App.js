import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('loggedUser')
    if (userJson) {
      const user = JSON.parse(userJson)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    const user = await loginService.login(userObject)
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    setUser(user)
    blogService.setToken(user.token)
  }

  const handleLogout = async event => {
    event.preventDefault()
    console.log('logging out')
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async blogObject => {
    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
    setMessage(`a new blog ${response.title} by ${response.author} added`)
    setTimeout(() => setMessage(null), 5000)
  }


  return (
    <>
      {user === null ? <LoginForm newLogin={handleLogin} message={message} setMessage={setMessage} /> :
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <p>{user.username} logged in<button onClick={handleLogout} >logout</button></p>
          <NewBlogForm addNewBlog={addBlog} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}



    </>
  )
}

export default App
