import { voteFor, sortByVotes } from '../reducers/anecdoteReducer'
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
  const anecdotes = useSelector(state => state)

  const vote = (id) => {
    dispatch(voteFor(id))
    dispatch(sortByVotes())
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
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