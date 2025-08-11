import { useDispatch } from "react-redux"
import { Createnecdote } from "../reducers/anecdoteReducer"

const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const handleCreate = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(Createnecdote(content))
        anecdotes.sort((a,b) => b.votes - a.votes)
      }
    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={handleCreate}>
                <div><input name="anecdote" /></div>
                <button type='submit' >create</button>
            </form>
        </div>
    )
}
export default AnecdotesForm