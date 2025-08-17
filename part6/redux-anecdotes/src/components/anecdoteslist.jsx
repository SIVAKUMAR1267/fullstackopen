import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createSelector } from '@reduxjs/toolkit'
import { setNotification, clearNotification } from '../reducers/notificationreducer'

const selectFilteredAndSortedAnecdotes = createSelector(
  [(state) => state.anecdotes, (state) => state.filter],
  (anecdotes, filter) => {
    const filteredAnecdotes = filter
      ? anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(filter.toLowerCase())
        )
      : anecdotes
    return [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)
  }
)


const Anecdoteslist = () => {
     const anecdotes = useSelector(selectFilteredAndSortedAnecdotes)
    
    const dispatch = useDispatch()

    const handlevote = (id) => {
        dispatch(vote(id))
        dispatch(setNotification(`you voted '${anecdotes.find(a => a.id === id).content}'`))
        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
        
      }
    return (
        <div>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handlevote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}
export default Anecdoteslist