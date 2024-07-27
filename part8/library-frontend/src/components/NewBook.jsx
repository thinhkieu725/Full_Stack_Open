import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, GET_ALL_BOOKS, GET_ALL_AUTHORS } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ addBook ] = useMutation(ADD_BOOK, {
    update: (cache, response) => {
      const addBook = response.data.addBook
      if (cache.readQuery({ query: GET_ALL_BOOKS })) {  
        cache.updateQuery({ query: GET_ALL_BOOKS }, ({ allBooks }) => {
          return {
            allBooks: allBooks.concat(response.data.addBook),
          }
        })
      }
      const involvedGenres = addBook.genres
      involvedGenres.forEach(genre => {
        if (genre === '') return
        if (cache.readQuery({ query: GET_ALL_BOOKS, variables: { genre } })) {
          cache.updateQuery({ query: GET_ALL_BOOKS, variables: { genre } }, ({ allBooks }) => {
            return {
              allBooks: allBooks.concat(response.data.addBook),
            }
          })
        }
      })
    },
    refetchQueries: [
      { query: GET_ALL_AUTHORS }
    ]
  })

  const submit = async (event) => {
    event.preventDefault()

    addBook({ variables: { title, author, published: parseInt(published), genres } })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    if (genre === '') 
      return

    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook