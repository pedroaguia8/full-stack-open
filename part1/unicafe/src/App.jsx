/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

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
    <>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text='good' />
      <Button handleClick={handleNeutralClick} text='neutral' />
      <Button handleClick={handleBadClick} text='bad' />
      <h1>statistics</h1>
      <Statistic text='good' statistic={good} />
      <Statistic text='neutral' statistic={neutral} />
      <Statistic text='bad' statistic={bad} />
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ text, statistic }) => (
  <p>{text} {statistic}</p>
)

export default App