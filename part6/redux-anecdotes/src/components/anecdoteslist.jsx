import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdoteslist = () => {
    const anecdotes = useSelector(state => state)
    anecdotes.sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const handlevote = (id) => {
        dispatch(vote(id))
        anecdotes.sort((a,b) => b.votes - a.votes)
      }
    return (
        <div>
            <h2>Anecdotes</h2>
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