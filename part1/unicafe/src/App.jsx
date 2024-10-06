import { useState } from 'react'
import Total from './compontent/total'
import Button from './compontent/button'
const App = () => {
  // save clicks of each button to its own state
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  const handlegood = () => {
       setGood(good+1) 
  }
  const handlenetural = () => {
    setNeutral(neutral+1) 
  }
  const handlebad = () => {
    setBad(bad+1) 
  }
  return (
    <div>
      <h1>Give Feedback</h1>
     <div>
      <Button onclick={handlegood} text="Good"/>
      <Button onclick={handlenetural} text="Netural"/>
      <Button onclick={handlebad} text="Bad" />
      </div>
      <h1>Satictics</h1>
      <Total good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App