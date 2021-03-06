import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

import './index.css'


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs.sort((a, b) => b.likes - a.likes))
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
    // console.log('logging out')
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()
    const response = await blogService.create(blogObject)
    setBlogs(blogs.concat(response))
    setMessage(`a new blog ${response.title} by ${response.author} added`)
    setTimeout(() => setMessage(null), 5000)
  }

  const removeBlog = async (blogToRemove) => {
    if (window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      await blogService.del(blogToRemove.id)
      setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
    }
  }

  const handleLikeButton = async (updatedBlog) => {
    const response = await blogService.update(updatedBlog.id, updatedBlog)
    // console.log(response)
    setBlogs(blogs.sort((a, b) => b.likes - a.likes).map(blog => blog.id !== response.data.id ? blog : response.data))
  }


  return (
    <>
      {user === null
        ?
        <LoginForm newLogin={handleLogin} message={message} setMessage={setMessage} />
        :
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <p>{user.username} logged in<button id="logout-button" onClick={handleLogout} >logout</button></p>
          <Togglable buttonLabel='new blog' ref={blogFormRef} >
            <NewBlogForm addNewBlog={addBlog} />
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} likeButton={handleLikeButton} delBlog={removeBlog} user={user} />
          )}
        </div>}



    </>
  )
}

export default App
