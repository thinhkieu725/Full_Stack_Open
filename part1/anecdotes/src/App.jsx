import { useState } from 'react'

const Header = ({title}) => {
  return (
    <div>
      <h1>
        {title}
      </h1>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <div>
      <button onClick={handleClick}>
        {text}
      </button>
    </div>
  )
}

const VoteReport = ({number}) => {
  return (
    <div>
      <p>has {number} votes</p>
    </div>
  )
}

const BestAnecdote = ({anecdotes, bestAnecdoteIdx, highestVote}) => {
  if (highestVote === 0) {
    return 
  }
  return (
    <div>
      {anecdotes[bestAnecdoteIdx]}
      <VoteReport number={highestVote} />
    </div>
  )
}

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))
  const [highestVote, setHighestVote] = useState(0)
  const [bestAnecdoteIdx, setBestAnecdoteIdx] = useState(0)

  const handleVoteClick = () => {
    let copy = [...points]
    copy[selected] += 1

    if (Math.max(...copy) > highestVote) {
      setHighestVote(Math.max(...copy))
      let newBestAnecdoteIdx = copy.indexOf(Math.max(...copy))
      setBestAnecdoteIdx(newBestAnecdoteIdx)
    }
    setPoints(copy)
  }

  const handleNextAnecdoteClick = () => {
    let nextAnecdote = getRandomInteger(0, anecdotes.length - 1)
    setSelected(nextAnecdote)
  }
  return (
    <div>
      <Header title="Anecdote of the day" />
      {anecdotes[selected]}
      <VoteReport number={points[selected]} />
      <table>
        <tbody>
          <tr>
          <td><Button handleClick={handleVoteClick} text="vote" /></td>
          <td><Button handleClick={handleNextAnecdoteClick} text="next anecdote" /></td>
          </tr>
        </tbody>
      </table>
      <Header title="Anecdote with most votes" />
      <BestAnecdote anecdotes={anecdotes} bestAnecdoteIdx={bestAnecdoteIdx} highestVote={highestVote} />
    </div>
  )
}

export default App