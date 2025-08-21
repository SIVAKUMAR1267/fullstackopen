import { useDispatch } from "react-redux"
import { createanecdote } from "../reducers/anecdoteReducer"
import { setNotificationWithTimeout} from "../reducers/notificationreducer"


const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const handleCreate = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createanecdote(content))
        dispatch(setNotificationWithTimeout(`you created '${content}'`,5))
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