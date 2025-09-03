import { useState } from 'react'

const Button = ({ title, onClick }) =>
  <>
    <button onClick={onClick}>{title}</button>
  </> 

const Title = ({ title }) =>
    <>
      <p><b>{title}</b></p>
    </>

const Display = ({ title }) =>
  <>
    <p>{title}</p>
  </>

const Anecdote = ({ anecdote, numVotes }) =>
  <>
    <Display title={anecdote} />
    <Display title={'has ' + numVotes + ' votes'} />
  </>

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
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  
  const getNextAnecdote = () => setSelected(Math.floor(anecdotes.length*Math.random())) 
  const updateVote = () => {
    const newVotes = [...votes]
    newVotes[selected]++

    if (newVotes[selected] > newVotes[mostVoted]) {
      setMostVoted(selected)
    } 

    setVotes(newVotes)
  }

  return (
    <>
      <div>
        <Title title={'Anecdote of the day'} />
        <Anecdote anecdote={anecdotes[selected]} numVotes={votes[selected]} /> 
        <Button title={'next anecdote'} onClick={getNextAnecdote} />
        <Button title={'vote'} onClick={updateVote} />

        <Title title={'Anecdote with most votes'} />
        <Anecdote anecdote={anecdotes[mostVoted]} numVotes={votes[mostVoted]} /> 
      </div>
    </>
  )
}

export default App