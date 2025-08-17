import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdoteslist = () => {
     const anecdotes = useSelector((state) =>
    state.filter === ""
      ? [...state.anecdotes].sort((a, b) => b.votes - a.votes)
      : [...state.anecdotes.filter((anecdote) =>
          anecdote.content.toLowerCase().includes(state.filter)
        )].sort((a, b) => b.votes - a.votes)
  )

    
    const dispatch = useDispatch()

    const handlevote = (id) => {
        dispatch(vote(id))
        
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