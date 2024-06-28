import {createSlice} from '@reduxjs/toolkit'
import {loginCall} from 'src/store/login/actions'

const initialState = {
  isLoading: false,
  user: {}
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
  }
})

export default usersSlice.reducer
