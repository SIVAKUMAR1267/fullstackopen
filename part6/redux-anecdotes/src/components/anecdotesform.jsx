import { useDispatch } from "react-redux"
import { createanecdote } from "../reducers/anecdoteReducer"
import { setNotification,clearNotification } from "../reducers/notificationreducer"


const AnecdotesForm = () => {
    const dispatch = useDispatch()

    const handleCreate = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createanecdote(content))
        dispatch(setNotification(`you created '${content}'`))
        setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
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