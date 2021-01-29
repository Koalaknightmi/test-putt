import { createSlice } from '@reduxjs/toolkit'

authUser = (state,action) => (state)

const userReducer = createSlice({
  name:"user",
  initialState: null,
  reducers:{
    user:authUser,
  }
})

export const { authUser } = userReducer.actions

export default userReducer.reducer