import { useDispatch } from "react-redux"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import { addAnecdote } from "../reducers/anecdoteReducer"

const NewAnecdote = () => {
  const dispatch = useDispatch()

  const createNote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))

    dispatch(setNotification(`you created '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createNote}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdote