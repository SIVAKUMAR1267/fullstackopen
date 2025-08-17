import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const Anecdoteslist = () => {
    const anecdotes = useSelector(({ filter, anecdotes }) => {
        if ( filter === '' ) {
            return anecdotes
        }
        const filteredanecdote = anecdotes.filter((anecdotes) =>
            anecdotes.content.includes(filter))
        return filteredanecdote
})
    anecdotes.sort((a,b) => b.votes - a.votes)
    const dispatch = useDispatch()

    const handlevote = (id) => {
        dispatch(vote(id))
        anecdotes.sort((a,b) => b.votes - a.votes)
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