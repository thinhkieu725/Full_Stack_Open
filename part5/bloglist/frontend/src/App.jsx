import { useState, useEffect, useRef } from 'react'
import '../index.css'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleLikeIncrease = (blog) => {
    return async () => {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1
      }
      const returnedBlog = await blogService.update(blog.id, newBlog)
      const updatedBlogs = blogs.map(blog => blog.id === returnedBlog.id ? newBlog : blog)
      const sortedBlogs = updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(sortedBlogs)
    }
  }

  const handleDelete = (blog) => {
    return async () => {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        try {
          await blogService.remove(blog.id)
          const updatedBlogs = blogs.filter(b => b.id !== blog.id)
          setBlogs(updatedBlogs)
          setSuccessMessage(`blog ${blog.title} by ${blog.author} removed`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        }
        catch (exception) {
          setErrorMessage('Failed to remove blog')
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        }
      }
    }
  }

  const addBlog = async (blogObject) => {
    BlogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))

      setSuccessMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    }
    catch (exception) {
      setErrorMessage('Failed to add blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const BlogFormRef = useRef()

  const addBlogForm = () => {
    return (
      <Togglable buttonLabel='new blog' ref={BlogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification errorMessage={errorMessage} successMessage={successMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              data-testid='username'
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
              data-testid='password'
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage} />
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <h2>create new</h2>
      {addBlogForm()}
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeIncrease={handleLikeIncrease(blog)}
          handleDelete={handleDelete(blog)}
        />
      )}
    </div>
  )
}

export default App