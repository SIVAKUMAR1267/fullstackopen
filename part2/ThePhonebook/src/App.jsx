import { useState } from 'react'

  const App = () => {
    const [persons, setPersons] = useState([
      { name: 'Arto Hellas', number: '040-123456', id: 1 },
      { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
      { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
      { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter,setNewfilter]=useState('')
  const addname = (event) => {
    event.preventDefault()
  const personsObject = {
      id: String(persons.length + 1),
      name: newName,
      number:newNumber
  }
const nameexists = persons.some((persons)=>persons.name === newName)
const numberexists = persons.some((persons)=>persons.number === newNumber)
    if (nameexists) {
      alert(newName + ' is already added to phonebook')}
    if(numberexists){
      alert(newNumber + ' is already added to phonebook')}
    else{
    setPersons(persons.concat(personsObject))
    setNewName('')
    setNewNumber('')
    }}

  const handleChangefilter = (event) => {
      setNewfilter(event.target.value)
  }
  const handleChangename = (event) => {
        setNewName(event.target.value)
    }
  const handleChangenumber = (event) => {
        setNewNumber(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      filter shown with:<input value={newfilter}
      onChange={handleChangefilter}/>
      </div>
      <h2> add a new</h2>
      <form onSubmit={addname}>
        <div>  
          name: <input value={newName}
          onChange={handleChangename} />
        </div>
        <div>number: <input value={newNumber}
        onChange={handleChangenumber}
        /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(persons => 
          <li key={persons.id}>{persons.name}  {persons.number}
          </li>
        )}
      </ul>
    </div>
   
  )
}

export default App