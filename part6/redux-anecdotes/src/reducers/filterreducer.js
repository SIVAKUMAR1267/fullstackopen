import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react'

const filterslice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterchange:(state, action) => action.payload,
  },
})
export const filterChange = filterslice.actions.filterchange
export default filterslice.reducer