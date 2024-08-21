import { useState } from 'react'

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
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0))

  const indexOfMax = (arr) => {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }

  const mostVotesIndex = indexOfMax(points)

  const onNextAnecdote = () => {
    const selection = Math.floor(Math.random() * anecdotes.length)
    setSelected(selection)
  }

  const onVote = () => {
    const copy = [...points]
    copy[selected] += 1

    setPoints(copy)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <div>{anecdotes[selected]}</div>
      <div>has {points[selected]} votes</div>
      <div>
        <Button onClick={onVote} text='vote' />
        <Button onClick={onNextAnecdote} text='next anecdote' />
      </div>
      <h1>Anecdote with most upvotes</h1>
      <div>{anecdotes[mostVotesIndex]}</div>
      <div>has {points[mostVotesIndex]} votes</div>
    </>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)



export default App