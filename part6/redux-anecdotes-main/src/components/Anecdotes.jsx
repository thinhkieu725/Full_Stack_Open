import { vote, sortByVotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const voteHandle = (id) => {
    dispatch(vote(id))
    dispatch(sortByVotes())
    dispatch(showNotification('You voted for: ' + anecdotes.find(a => a.id === id).content, 5))
  }
  const anecdotesToShow = filter == ''
  ? anecdotes
  : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.trim().toLowerCase()))
  return (
    <div>
      {anecdotesToShow.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => voteHandle(anecdote.id)}
        /> 
      )}
    </div>
  );
}

export default AnecdoteList;