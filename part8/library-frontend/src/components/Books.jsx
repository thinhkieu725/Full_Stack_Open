import { useQuery } from "@apollo/client"
import { useState } from "react"

import { GET_ALL_BOOKS } from "../queries"

const Books = () => {
  const [chosenGenre, setChosenGenre] = useState(null)
  const result = useQuery(GET_ALL_BOOKS)
  const booksByGenreResult = useQuery(GET_ALL_BOOKS, {
    skip: !chosenGenre,
    variables: { genre: chosenGenre }
  })

  if (result.loading) {
    return <div>loading...</div>
  }
  const books = result.data.allBooks
  const genres = [...new Set(books.map((b) => b.genres).flat())]

  if (chosenGenre) {
    if (booksByGenreResult.loading) {
      return <div>loading...</div>
    }
    const booksByGenre = booksByGenreResult.data.allBooks

    return (
      <div>
        <h2>books</h2>

        <p>in genre <strong>{chosenGenre}</strong></p>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {booksByGenre.map((b) => (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          {genres.map((g) => (
            <button key={g} onClick={() => setChosenGenre(g)}>{g}</button>
          ))}
          <button onClick={() => setChosenGenre(null)}>all genres</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {genres.map((g) => (
          <button key={g} onClick={() => setChosenGenre(g)}>{g}</button>
        ))}
        <button onClick={() => setChosenGenre(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
