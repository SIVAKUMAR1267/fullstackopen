import { createSlice } from '@reduxjs/toolkit'
import users from '../services/users'

const usersslice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setusers(state, action) {
      return action.payload
    },
  },
})

export const { setusers } = usersslice.actions

export const initializeusers = () => {
  return async (dispatch) => {
    const allusers = await users.getAll()
    dispatch(setusers(allusers))
  }
}

export default usersslice.reducer
