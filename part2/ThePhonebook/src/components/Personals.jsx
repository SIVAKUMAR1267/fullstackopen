const Pesonals = ({filteredname,handleDelete}) =>{
return(
<div>
    <ul>
    {filteredname.map(persons => 
      <li key={persons.id}>{persons.name}  {persons.number}
      <button onClick={() => handleDelete(persons.id)}>Delete</button>
      </li>
    )}
     
  </ul>
</div>
)}
export default Pesonals