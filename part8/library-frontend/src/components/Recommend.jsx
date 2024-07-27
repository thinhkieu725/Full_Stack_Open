import { useQuery } from '@apollo/client'
import { ME, GET_ALL_BOOKS_BY_GENRE } from '../queries'

const Recommend = () => {
  const meResult = useQuery(ME)

  // Move the booksResult hook to the top level
  const booksResult = useQuery(GET_ALL_BOOKS_BY_GENRE, {
    skip: !meResult.data, // Skip the query if meResult.data is not available yet
    variables: { genre: meResult.data ? meResult.data.me.favoriteGenre : '' }
  })

  if (!window.localStorage.getItem('library-user-token')) {
    return null
  }

  if (meResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  const user = meResult.data.me
  const books = booksResult.data.allBooks
  
  return (
    <div>
      <h2>recommendations</h2>

      <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommend