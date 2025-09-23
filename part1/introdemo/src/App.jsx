import { useState } from 'react'


const Button = ({handleClick,text}) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({text, value} ) => (
  <tr> 
    <td>{text}</td> 
    <td>{value}</td>
  </tr>
  );

const Statistics = (props) => {
  const total = props.good + props.neutral + props.bad

  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return(
    <div>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value = {total} />
      <StatisticLine text="average" value = {(props.good * 1 + props.neutral * 0 + props.bad * -1) / total || 0} />
      <StatisticLine text="positive" value = {((props.good / total) * 100 || 0).toFixed(0) + " %"} />  
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const handleGoodClick= () => {
    setGood( good + 1 )
  };

  const handleNeutralClick = () => {
    setNeutral ( neutral + 1)
  }

  const handleBadClick = () => {
    setBad (bad + 1)
  } 



  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text = "good"/>
      <Button handleClick={handleNeutralClick} text = "neutral"/>
      <Button handleClick={handleBadClick} text = "bad"/>
      <Statistics good = {good} bad = {bad} neutral = {neutral}/>
    </div>
  )
}

export default App