import { useState } from 'react'

const Blog = ({ blog, handleLikeIncrease, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }


  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const removeButton = () => {
    if (blog.user.username === JSON.parse(window.localStorage.getItem('loggedBlogappUser')).username) {
      return <button onClick={handleDelete}>remove</button>
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      </div>
      <div style={showWhenVisible} className='showWhenVisible'>
        <div>
          {blog.url}
        </div>
        <div>
          likes {blog.likes}
          <button onClick={handleLikeIncrease}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div>
          {removeButton()}
        </div>
      </div>
    </div>
  )}

export default Blog