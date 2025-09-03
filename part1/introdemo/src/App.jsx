import { useState } from 'react'
import './App.css'

const Display = ({ counter }) => 
  <>
    <div>{counter}</div>
  </>
  
const Button = ({ text, onClick }) => 
  <>
    <button onClick={onClick}>
      {text}
    </button>
  </>

// Conditional Rendering
const History = ({allClicks}) => {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [clicks, setClicks] = useState({
    left: 0, right: 0
  })

  const [total, setTotal] = useState(0)
  const [allClicks, setAllClicks] = useState([])

  const hello = (who) => () => {
    console.log('hello', who)
  }

  const handleLeftClick = () => {
    setClicks({
      ...clicks,
      left: clicks.left + 1,
    })

    setTotal(clicks.left + 1 + clicks.right)
    setAllClicks(allClicks.concat('L'))
  }

  const handleRightClick = () => {
    setClicks({
      ...clicks,
      right: clicks.right + 1
    }) 

    setTotal(clicks.left + clicks.right + 1)
    setAllClicks(allClicks.concat('R'))
  }

  return (
    <>
      <div> 
        <Display counter={clicks.left} />
        <Display counter={clicks.right} />
        <Display counter={total} />
        <Display counter={allClicks.join(' ')} />
        <Button onClick={handleLeftClick} text={'left'} />
        <Button onClick={handleRightClick} text={'right'} />
        <Button onClick={hello('world')} text={'say hi!'} />
        <History allClicks={allClicks} />
      </div>
    </>
  )
}

export default App
