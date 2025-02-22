import { useState } from 'react'

function App() {
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

  const [votes, setVotes] = useState(Array(8).fill(0))

  const randomSelect = () => {
    const selection = Math.floor(Math.random()*8)

    // make sure new anecdote generated and not same
    if (selected == selection) {
      randomSelect()
    } else {
      setSelected(selection)
    }
  }

  const voteAnecdote = () => {
    const newVotes = [...votes]
    newVotes[selected]++
    setVotes(newVotes)
  }

  const mostVotes = () => {
    const maxValue = Math.max(...votes)
    const mostVoted = votes.indexOf(maxValue)
    console.log(mostVoted)

    if (maxValue != 0) {
      return mostVoted
    }
    else {
      return -1
    }
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>Votes: {votes[selected]}</p>
      <button onClick={voteAnecdote}>Vote</button>
      <button onClick={randomSelect}>New Anecdote</button>
      <h1>Anecdote with the Most Votes</h1>
      <p>{anecdotes[mostVotes()]}</p>
    </div>
  )
}

export default App
