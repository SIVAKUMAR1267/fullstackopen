import { useState, useEffect } from 'react'
import names from './services/names'
import Personalform from './components/Personalforms'
import Filter from './components/Filter'
import Personals from './components/Personals'
import Notification from './components/message'

const App = (props) => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter, setNewfilter] = useState('')
  const [filteredname, setfilteredname] = useState([])
  const [Message, setMessage] = useState(null)
  useEffect(() => {
    names.getAll()
      .then(initialpersons => {
        setPersons(initialpersons)
        setfilteredname(initialpersons)
      })
  }, [])

  const addname = (event) => {
    event.preventDefault()
    const personsObject = {
      name: newName,
      number: newNumber
    }
    const existingPerson = persons.find(person => person.name === newName)
    const existingnumber = persons.find(person => person.number === newNumber )
    if (existingPerson) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        names.update(existingPerson.id, personsObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.id !== existingPerson.id ? person : updatedPerson))
            setfilteredname(filteredname.map(person => person.id !== existingPerson.id ? person : updatedPerson))
            setNewName('')
            setNewNumber('')
            setMessage(`'${newName}' is added the phonebook`)
          })
      }
    }
    else {
      names.create(personsObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setfilteredname(filteredname.concat(newPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`'${newName}' is added the phonebook`)
        })
    }
  }


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      names.delete(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setfilteredname(filteredname.filter(person => person.id !== id))
        })
        .catch((error)=>{
          alert('the person is already deleted')
        })
      
    }
  }

  const handleChangefilter = (event) => {
    setNewfilter(event.target.value)
    const filteredlist = persons.filter((persons) =>
      persons.name.includes(event.target.value))
    setfilteredname(filteredlist)
  }

  const handleChangename = (event) => {
    setNewName(event.target.value)
  }

  const handleChangenumber = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <Filter newfilter={newfilter} handleChangefilter={handleChangefilter} />
      <Notification message={Message} />
      <h2> add a new</h2>
      <Personalform handleChangenumber={handleChangenumber} handleChangename={handleChangename} addname={addname}
        newName={newName} newNumber={newNumber} />
      <Personals filteredname={filteredname} handleDelete={handleDelete} />
    </div>
  )
}

export default App