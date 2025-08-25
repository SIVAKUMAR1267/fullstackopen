import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getanecdotes,updateanecdote } from './requests/requests'
import { useNotificationDispatch } from './reducers/Notification'

const App = () => {
    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({    
      mutationFn: updateanecdote,    
      onSuccess: () => {      
        queryClient.invalidateQueries({ queryKey: ['anecdotes'] })    
      },  
    })

  const dispatch = useNotificationDispatch()
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({type:'SET_NOTIFICATION',payload:`you voted '${anecdote.content}'`})
    setTimeout(() => {
      dispatch({type:'CLEAR_NOTIFICATION'})
    },5000)
  }


  const result = useQuery({    
    queryKey: ['anecdotes'],    
    queryFn: getanecdotes,
    refetchOnWindowFocus: false,
  })  
 
  
  if ( result.isPending ) {    
    return <div>loading data...</div>  
  }
  if (result.isError){
    return <di>anecdote services are not avaolable due to server problem</di>
  }
  const anecdotes = result.data
  anecdotes.sort((a,b) => b.votes - a.votes)
  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
