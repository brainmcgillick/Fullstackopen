import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <>
      <button onClick={onClick}>{text}</button>
    </>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}:</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = () => {
    return good + bad + neutral
  }

  const average = () => {
    return (good - bad) / total()
  }

  const percentage = () => {
    return (good / total()) * 100 +" %"
  }

  if (!good && !neutral && !bad) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neural" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={total()} />
        <StatisticLine text="Average" value={average()} />
        <StatisticLine text="Postive" value={percentage()} />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <h1>Give Feedback</h1>
      <Button onClick={addGood} text="Good" />
      <Button onClick={addNeutral} text="Neutral" />
      <Button onClick={addBad} text="Bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App
