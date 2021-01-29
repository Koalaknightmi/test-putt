import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  authUser:null
}

const userSession = (state,action) => ({
  ...state,
  authUser:action.payload
})

const sessionReducer = createSlice({
  name:"session",
  initialState: initialState,
  reducers:{
    session:userSession,
  }
})

export const { session } = sessionReducer.actions

export default sessionReducer.reducer