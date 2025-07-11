import Part from "./part";
const Content = ({parts}) =>{
    const sum = parts.reduce((total,part)=>  total + part.exercises,0)
    return(
    <div>
        {
            parts.map((part) => {
            return <Part key={part.id} part={part} />
        })
       
    } <b>Total of  {sum} excercise</b>
    </div>
    )
}
export default Content;