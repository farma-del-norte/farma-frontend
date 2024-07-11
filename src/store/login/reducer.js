import {createSlice} from '@reduxjs/toolkit'
import {loginCall, loadSession} from 'src/store/login/actions'

const initialState = {
  isLoading: false,
  user: null
}

// MARK: - Reducer
export const usersSlice = createSlice({
  name: 'login',
  initialState,
  extraReducers: builder => {
    builder.addCase(loginCall.pending, state => {
      state.isLoading = true
    })
    builder.addCase(loginCall.fulfilled, (state, {payload}) => {
      const {content} = payload
      localStorage.setItem('im-user', content.token)
      state.user = content.user
      state.isLoading = false
    })
    builder.addCase(loginCall.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(loadSession.pending, state => {
      state.isLoading = true
    })
    builder.addCase(loadSession.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(loadSession.fulfilled, (state, {payload}) => {
      state.isLoading = false
      state.user = payload.user
    })
  }
})

export default usersSlice.reducer
