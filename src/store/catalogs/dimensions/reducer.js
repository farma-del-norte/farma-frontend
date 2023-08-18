import {createSlice} from '@reduxjs/toolkit'
import {createDimension, editDimension, getDimensions} from './actions'

const initialState = {
  isLoading: false,
  dimensions: [],
  editDimension: {},
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null,
  error: null
}

// MARK: - Reducer
export const dimensionsSlice = createSlice({
  name: 'dimensions',
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
    builder.addCase(getDimensions.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getDimensions.fulfilled, (state, {payload}) => {
      state.dimensions = payload.content
      state.isLoading = false
    })
    builder.addCase(getDimensions.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createDimension.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createDimension.fulfilled, (state, {payload}) => {
      state.dimensions = payload.content
      state.isLoading = false
    })
    builder.addCase(createDimension.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editDimension.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editDimension.fulfilled, (state, {payload}) => {
      state.dimensions = payload.content
      state.isLoading = false
    })
    builder.addCase(editDimension.rejected, state => {
      state.isLoading = false
    })
  }
})

export default dimensionsSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = dimensionsSlice.actions
