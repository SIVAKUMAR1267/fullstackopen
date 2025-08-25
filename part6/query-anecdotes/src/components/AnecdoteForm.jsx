import { createanecdote } from "../requests/requests"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "../reducers/Notification"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const mutation = useMutation({mutationFn:createanecdote,
    onSuccess: (newanecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newanecdote))
      dispatch({type:'SET_NOTIFICATION',payload:`you created '${newanecdote.content}'`})
      setTimeout(() => {
        dispatch({type:'CLEAR_NOTIFICATION'})
      },5000)
    },
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    mutation.mutate({content, votes:0})
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
