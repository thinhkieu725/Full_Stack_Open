import AnecdoteList from './components/Anecdotes'
import NewAnecdote from './components/NewAnecdote'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <NewAnecdote/>
    </div>
  )
}

export default App