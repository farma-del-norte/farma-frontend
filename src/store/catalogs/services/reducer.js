import {createSlice} from '@reduxjs/toolkit'
import {createServiceCat, editServiceCat, getServicesCat} from './actions'

const initialState = {
  isLoading: false,
  serviceCat: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const serviceSliceCat = createSlice({
  name: 'serviceCat',
  initialState,
  reducers: {
    /* edit modal */
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
    builder.addCase(getServicesCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getServicesCat.fulfilled, (state, {payload}) => {
      state.serviceCat = payload.content
      state.isLoading = false
    })
    builder.addCase(getServicesCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createServiceCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createServiceCat.fulfilled, (state, {payload}) => {
      state.serviceCat = payload.content
      state.isLoading = false
    })
    builder.addCase(createServiceCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editServiceCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editServiceCat.fulfilled, (state, {payload}) => {
      state.serviceCat = payload.content
      state.isLoading = false
    })
    builder.addCase(editServiceCat.rejected, state => {
      state.isLoading = false
    })
  }
})

export default serviceSliceCat.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = serviceSliceCat.actions
