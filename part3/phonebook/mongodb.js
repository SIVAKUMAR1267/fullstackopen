const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://siva:${password}@cluster0.eg2bl4m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  Name: String,
  number: String, 
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

if (process.argv.length === 3) {
  // Show all entries
  console.log("Phonebook:")
  Phonebook.find({}).then(result => {
    result.forEach(phonebook => {
      console.log(` ${phonebook.Name} ${phonebook.number}`)
    })
    mongoose.connection.close()
  })
} else if (process.argv.length === 5) {

  const name = process.argv[3]
  const number = process.argv[4]

  const entry = new Phonebook({ Name: name, number: number })

  entry.save().then(() => {
    console.log(`added ${name} ${number}`)
    mongoose.connection.close()
  })
}