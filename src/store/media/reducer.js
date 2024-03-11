import {createSlice} from '@reduxjs/toolkit'
import {createMediaService, editMediaService, getMediaService, getMediaByIdService, deleteMediaService} from './actions'

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
    toggleModal: (state, {payload}) => {
      state.isOpen = payload
    },
    setModalItem: (state, {payload}) => {
      state.modalItem = payload
    },
    toggleDeleteModal: (state, {payload}) => {
      state.isDeleteOpen = payload
    },
    setDeleteItem: (state, {payload}) => {
      state.modalDeleteItem = payload
    }
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
    builder.addCase(getMediaByIdService.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getMediaByIdService.fulfilled, (state, {payload}) => {
      state.media = payload.content
      state.isLoading = false
    })
    builder.addCase(getMediaByIdService.rejected, state => {
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

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = usersSlice.actions