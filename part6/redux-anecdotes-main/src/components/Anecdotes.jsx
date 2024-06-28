import { voteFor, sortByVotes } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
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

  const vote = (id) => {
    dispatch(voteFor(id))
    dispatch(sortByVotes())
    dispatch(setNotification(`You voted for: ${anecdotes.find(anec => anec.id === id).content}`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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
          handleClick={() => vote(anecdote.id)}
        /> 
      )}
    </div>
  );
}

export default AnecdoteList;