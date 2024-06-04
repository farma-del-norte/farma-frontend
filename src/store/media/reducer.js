import {createSlice} from '@reduxjs/toolkit'
import {createMediaService, editMediaService, getMediaService, getMediaByOwnerId, deleteMediaService} from './actions'

const initialState = {
  isLoading: false,
  media: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null,
  error: null
}

// MARK: - Reducer
export const usersSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setMedia: (state, {payload}) => {
      state.media = payload
    },
  },
  extraReducers: builder => {
    builder.addCase(getMediaService.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getMediaService.fulfilled, (state, {payload}) => {
      state.media = payload.content
      state.isLoading = false
    })
    builder.addCase(getMediaService.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createMediaService.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createMediaService.fulfilled, (state, {payload}) => {
      state.media = payload.content
      state.isLoading = false
    })
    builder.addCase(createMediaService.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(getMediaByOwnerId.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getMediaByOwnerId.fulfilled, (state, {payload}) => {
      state.media = payload.content
      state.isLoading = false
    })
    builder.addCase(getMediaByOwnerId.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editMediaService.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editMediaService.fulfilled, (state, {payload}) => {
      state.media = payload.content
      state.isLoading = false
    })
    builder.addCase(editMediaService.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteMediaService.pending, state => {
        state.isLoading = true
    })
    builder.addCase(deleteMediaService.fulfilled, (state, {payload}) => {
        state.media = payload.content
        state.isLoading = false
    })
    builder.addCase(deleteMediaService.rejected, state => {
        state.isLoading = false
    })
  }
})

export default usersSlice.reducer

export const {setMedia} = usersSlice.actions