import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload
    },
    revokeToken: state => {
      state.token = null
    }
  }
})

export const { setToken, revokeToken } = authSlice.actions

export default authSlice.reducer
