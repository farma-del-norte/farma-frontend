import {createSlice} from '@reduxjs/toolkit'
import {createDimensionCat, editDimensionCat, getDimensionsCat} from './actions'

const initialState = {
  isLoading: false,
  dimensionsCat: [],
  editDimensionCat: {},
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null,
  error: null
}

// MARK: - Reducer
export const dimensionsSlice = createSlice({
  name: 'dimensionsCat',
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
    builder.addCase(getDimensionsCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getDimensionsCat.fulfilled, (state, {payload}) => {
      state.dimensionsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(getDimensionsCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createDimensionCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createDimensionCat.fulfilled, (state, {payload}) => {
      state.dimensionsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(createDimensionCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editDimensionCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editDimensionCat.fulfilled, (state, {payload}) => {
      state.dimensionsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(editDimensionCat.rejected, state => {
      state.isLoading = false
    })
  }
})

export default dimensionsSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = dimensionsSlice.actions
