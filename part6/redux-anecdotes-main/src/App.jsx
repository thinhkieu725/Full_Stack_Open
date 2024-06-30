import { useEffect } from 'react'
import AnecdoteList from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <NewAnecdote/>
    </div>
  )
}

export default App