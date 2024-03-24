import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Title"
          onChange={event => setTitle(event.target.value)}
          placeholder='write title here'
          data-testid='title'
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="Author"
          onChange={event => setAuthor(event.target.value)}
          placeholder='write author here'
          data-testid='author'
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="URL"
          onChange={event => setUrl(event.target.value)}
          placeholder='write URL here'
          data-testid='url'
        />
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm