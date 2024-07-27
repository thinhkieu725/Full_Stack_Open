import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"

import { GET_ALL_AUTHORS, EDIT_AUTHOR } from "../queries"

const Authors = () => {
  const result = useQuery(GET_ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_ALL_AUTHORS }]
  })
  const [selectedAuthor, setSelectedAuthor] = useState('')
  const [born, setBorn] = useState('')

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const handleSelectChange = (event) => {
    setSelectedAuthor(event.target.value)
  }
  const handleBornChange = (event) => {
    setBorn(event.target.value)
  }
  const submit = (event) => {
    event.preventDefault()
    const setBornTo = parseInt(born)
    editAuthor({ variables: { name: selectedAuthor, setBornTo } })

    setBorn('')
  }

  if (!localStorage.getItem('library-user-token')) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <label> name
          <select onChange={handleSelectChange}>
            <option value="">Select author</option>
            {authors.map((a) => (
              <option key={a.name} value={a.name}>{a.name}</option>
            ))}
          </select>
        </label>
        <div> born <input type="number" value={born} onChange={handleBornChange} />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
