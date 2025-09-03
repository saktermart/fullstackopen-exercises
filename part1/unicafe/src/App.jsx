import { useState } from 'react'
import './App.css'

const Button = ({ title, onClick }) => 
  <>
    <button onClick={onClick}>{title}</button> 
  </>

const Display = ({ title }) =>
  <>
    <p>{title}</p>
  </>

const Statistics = ({ good, neutral, bad }) => {
  const total = (good+neutral+bad)
  if (total > 0) {
    const average = total/3
    const positiveFeedback = 100*(good/total)

    return (
      <div>
        <Display title={'statistics'} />
        <Display title={'good ' + good} />
        <Display title={'netural ' + neutral} />
        <Display title={'bad ' + bad} />
        <Display title={'average ' + average} />
        <Display title={'positive ' + positiveFeedback + '%'} />
      </div>
    )
  } else {
    return (
      <>
        <Display title={'statistics'} />
        <Display title={'No feedback given'} />
      </>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => setGood(good+1)
  const incrementNeutral = () => setNeutral(neutral+1)
  const incrementBad = () => setBad(bad+1)

  return (
    <>
      <div>
        <Display title='give feedback' />
        <Button title={'good'} onClick={incrementGood} />
        <Button title={'neutral'} onClick={incrementNeutral} />
        <Button title={'bad'} onClick={incrementBad} />
        
        <Statistics good={good} neutral={neutral} bad={bad} /> 
      </div>
    </>
  )
}

export default App
