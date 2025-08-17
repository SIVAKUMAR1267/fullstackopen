import AnecdoteForm from './components/anecdotesform'
import Anecdotelist from './components/anecdoteslist'
import Filter from './components/filter'
import Notification from './components/Notification'
const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter/>
      <Anecdotelist />
      <AnecdoteForm />
    </div>
  )
}

export default App