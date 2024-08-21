/* eslint-disable react/prop-types */
import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const average = Math.round((good - bad) / all * 10) / 10
  const positive = Math.round(good / all * 100 * 10) / 10 + ' %'

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
      <Statistics good={good} neutral={neutral} bad={bad}
        all={all} average={average} positive={positive} />
    </>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <>No feedback given</>
    )
  }
  return (
    <table>
      <tr><StatisticLine text='good' statistic={good} /></tr>
      <tr><StatisticLine text='neutral' statistic={neutral} /></tr>
      <tr><StatisticLine text='bad' statistic={bad} /></tr>
      <tr><StatisticLine text='all' statistic={all} /></tr>
      <tr><StatisticLine text='average' statistic={average} /></tr>
      <tr><StatisticLine text='positive' statistic={positive} /></tr>
    </table>
  )

}

const StatisticLine = ({ text, statistic }) => (
  <>
    <td>{text}</td>
    <td>{statistic}</td>
  </>
)

export default App