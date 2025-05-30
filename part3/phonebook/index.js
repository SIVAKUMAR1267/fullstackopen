require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => {
  return req.method === 'POST' ? JSON.stringify(req.body) : '';
});

app.use(morgan(':method :url :status :res[content-length]  :response-time ms :body'));

const Persons = require('./model/persons')

const generateId = () => {
  const key = Math.random().toString(36).substring(2, 15);
  return key
}


  app.post('/api/persons', (request, response) => {
    const body = request.body
    
      if (!body.name || !body.number) {
        return response.status(400).json({ 
          error: 'name or number missing' 
        })
      }
      if (persons.find(person => person.name === body.name)) {
        return response.status(400).json({ 
          error: 'name must be unique' 
        })
      }
    
      const person = {
        "name": body.name,
        "number": body.number,
        id: generateId(),
      }
    
    persons = persons.concat(person)
    
    response.json(person)
    })

app.get('/info', (request, response) => {
    const date = new Date()
    const totalPersons = Persons.length
    const info = `Phonebook has info for ${totalPersons} people<br>${date}`
    response.send(info)
  })

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    Persons = Persons.filter( Person => Person.id !== id)
  
    response.status(204).end()
  })

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    
    
    response.status(404).end()
  }
})

app.get('/api/persons', (request, response) => {
  Persons.find({}).then(person => {
    response.json(person)
  })
})
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`)
  })