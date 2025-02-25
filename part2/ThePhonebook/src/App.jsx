import { useState,useEffect } from 'react'
import names from './services/names'
import Personalform from './components/Personalforms'
import Filter from './components/Filter'
import Pesonals from './components/Personals'

const App = (props) => {
    const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newfilter,setNewfilter]=useState('')
  const [filteredname,setfilteredname]=useState([])
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
      id: String(persons.length + 1),
      name: newName,
      number:newNumber
  }
const nameexists = persons.some((persons)=>persons.name === newName)
const numberexists = persons.some((persons)=>persons.number === newNumber)
    if (nameexists) {return(
      alert(newName + ' is already added to phonebook'))}
    if(numberexists){return(
      alert(newNumber + ' is already added to phonebook'))}
    else{
    setPersons(persons.concat(personsObject))
    setfilteredname(filteredname.concat(personsObject))
    setNewName('')
    setNewNumber('')
    }
    names.create(personsObject)
    .then(initialpersons => {
      setPersons(persons.concat(initialpersons))
      setNewName('')
      setNewNumber('')
    })
  
  }
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      names.delete(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setfilteredname(filteredname.filter(person => person.id !== id))
        })
        .catch((error)=>{
          console.log(error)
          alert('The person has already been deleted')
        })
      
    }
    
  }

  const handleChangefilter = (event) => {
      setNewfilter(event.target.value)
  const filteredlist =persons.filter((persons)=>
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
     <Filter newfilter={newfilter} handleChangefilter={handleChangefilter}/>
     <h2> add a new</h2>
     <Personalform handleChangenumber={handleChangenumber} handleChangename={handleChangename} addname={addname}
      newName={newName} newNumber={newNumber} />
     <Pesonals filteredname={filteredname} handleDelete={handleDelete}/>
    </div>
   
  )
}

export default App