import { useState } from 'react'

  const App = () => {
    const [persons, setPersons] = useState([
      {id:1,
        name: 'Arto Hellas' }
    ]) 
  const [newName, setNewName] = useState('')
  const addname = (event) => {
    event.preventDefault()
    const personsObject = {
      id: String(persons.length + 1),
      name: newName
    }
    setPersons(persons.concat(personsObject))
    setNewName('')
    }


  const handleNoteChange = (event) => {
        setNewName(event.target.value)
        }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addname}>
        <div>
          name: <input value={newName}
          onChange={handleNoteChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(persons => 
          <li key={persons.id}>{persons.name}
          </li>
        )}
      </ul>
    </div>
   
  )
}

export default App