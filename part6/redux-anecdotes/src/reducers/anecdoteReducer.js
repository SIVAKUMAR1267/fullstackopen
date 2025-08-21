import { createSlice } from '@reduxjs/toolkit'
import anecdoteservices from '../services/anecdoteservices'



const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteslice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    vote: (state, action) => {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const votedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
      return state.map(a => a.id !== id ? a : votedAnecdote)
    },
    appendanecdote(state, action) {      
      state.push(action.payload)    
      },
    setanecdotes: (state, action) => {
      return action.payload
      }
       
  },
})
export const {vote, appendanecdote,setanecdotes } = anecdoteslice.actions


export const initializeanecdotes = () => {
  return async (dispatch) =>{
  const anecdotes = await anecdoteservices.getAll()
  dispatch(setanecdotes(anecdotes))
  }
}
export const createanecdote = content => {
  return async (dispatch) => {
    const newanecdote = await anecdoteservices.create(content)
    dispatch(appendanecdote(newanecdote))
  }
}
export const updatevote = id => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find(a => a.id === id)
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteservices.update(id, updatedAnecdote)
    dispatch(vote(id))
  }
}
export default anecdoteslice.reducer
