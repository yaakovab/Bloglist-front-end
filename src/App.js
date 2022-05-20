import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const addBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title, author, url
    }
    const response = await blogService.create(newBlog)
    setBlogs(blogs.concat(response))
    setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
    setTimeout(() => setMessage(null), 5000)
    setAuthor('')
    setTitle('')
    setUrl('')
    console.log('new blog added', title, author, url)
  }



  const newBlogForm = () => {
    return (
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          title: <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author: <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url: <input
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button onClick={addBlog}>create</button>
      </form>)
  }
  return (
    <>
      {user === null ? <LoginForm newLogin={handleLogin} message={message} setMessage={setMessage} /> :
        <div>
          <h2>blogs</h2>
          <Notification message={message} />
          <p>{user.username} logged in<button onClick={handleLogout} >logout</button></p>
          {newBlogForm()}
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}



    </>
  )
}

export default App
