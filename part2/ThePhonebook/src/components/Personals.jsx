const Pesonals = ({filteredname}) =>{
return(
<div>
    <ul>
    {filteredname.map(persons => 
      <li key={persons.id}>{persons.name}  {persons.number}
      </li>
    )}
  </ul>
</div>
)}
export default Pesonals