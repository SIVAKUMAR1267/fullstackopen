import AnecdoteForm from './components/anecdotesform'
import Anecdotelist from './components/anecdoteslist'
import Filter from './components/filter'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Anecdotelist />
      <AnecdoteForm />
    </div>
  )
}

export default App