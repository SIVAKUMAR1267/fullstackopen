import { useEffect } from 'react'
import AnecdoteForm from './components/anecdotesform'
import Anecdotelist from './components/anecdoteslist'
import Filter from './components/filter'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeanecdotes } from './reducers/anecdoteReducer'


const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeanecdotes())
},[])

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