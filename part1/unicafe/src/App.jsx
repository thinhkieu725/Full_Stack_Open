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

const StatisticLine = ({label, value}) => {
  let number = 0
  if (!isNaN(value)) {
    number = value
  }
  if (label === "percentage") {
    return (
      <div>
        <p>
          {label} {number} %
        </p>
      </div>
    )
  }
  else {
    return (
      <div>
        <p>
          {label} {number}
        </p>
      </div>
    )
  }
  
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  let all = good + neutral + bad
  let average = (good - bad) / (good + neutral + bad)
  if (isNaN(average)) {
    average = 0
  }
  else {
    average = average.toFixed(1)
  }
  let percentage = good / (good + neutral + bad) * 100
  if (isNaN(percentage)) {
    percentage = 0
  }
  else {
    percentage = percentage.toFixed(1)
  }
  return (
    <table>
      <tbody>
        <tr>
          <td>good</td>
          <td>{good}</td>
        </tr>
        <tr>
          <td>neutral</td>
          <td>{neutral}</td>
        </tr>
        <tr>
          <td>bad</td>
          <td>{bad}</td>
        </tr>
        <tr>
          <td>all</td>
          <td>{all}</td>
        </tr>
        <tr>
          <td>average</td>
          <td>{average}</td>
        </tr>
        <tr>
          <td>percentage</td>
          <td>{percentage} %</td>
        </tr>
      </tbody>
    </table>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // button click handling function
  const handleGoodClick = () => {
    setGood(good + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }


  return (
    <div>
      <Header title="give feedback" />
      <table>
        <tbody>
          <tr>
            <td><Button handleClick={handleGoodClick} text="good" /></td>
            <td><Button handleClick={handleNeutralClick} text="neutral" /></td>
            <td><Button handleClick={handleBadClick} text="bad" /></td>
          </tr>
        </tbody>
      </table>

      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

export default App