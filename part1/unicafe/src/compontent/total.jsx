import Statistics from "./statistics";
const Total =({good,neutral,bad}) =>{
    const total = good+neutral+bad;
    if(total == 0){
      return(
        <div>
          <p>No Feedback is  given</p>
        </div>
      )
    }
    return( 
      <div>  
    <Statistics text="Good" value={good} />
    <Statistics text="Netural" value={neutral} />
    <Statistics text="Bad" value={bad} />
    <Statistics text="All" value={total} />
    <Statistics text="Average" value={((good-bad)/total).toFixed(2)} />
    <Statistics text="Positive" value={((good*100)/total).toFixed(2)} />
    </div>
  )
  }
  export default Total
  