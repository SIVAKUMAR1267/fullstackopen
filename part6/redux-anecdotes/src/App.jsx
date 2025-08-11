import AnecdoteForm from './components/anecdotesform'
import Anecdotelist from './components/anecdoteslist'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotelist />
      <AnecdoteForm />
    </div>
  )
}

export default App