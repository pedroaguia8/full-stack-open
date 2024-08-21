/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const average = (good - bad) / all
  const positive = good / all * 100 + ' %'

  const handleGoodClick = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setAll(all + 1)
  }

  const handleNeutralClick = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
    setAll(all + 1)
  }

  const handleBadClick = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setAll(all + 1)
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
      <Statistic text='all' statistic={all} />
      <Statistic text='average' statistic={average} />
      <Statistic text='positive' statistic={positive} />
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