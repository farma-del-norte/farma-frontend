import {createSlice} from '@reduxjs/toolkit'
import {createSupplier, editSupplier, getSuppliers, deleteSupplier} from './actions'

const initialState = {
  isLoading: false,
  suppliers: [],
  isOpen: false,
  isDeleteOpen: false,
  modalItem: null,
  modalDeleteItem: null
}

export const suppliersSlice = createSlice({
  name: 'suppliers',
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
    builder.addCase(getSuppliers.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getSuppliers.fulfilled, (state, {payload}) => {
      state.suppliers = payload.content
      state.isLoading = false
    })
    builder.addCase(getSuppliers.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createSupplier.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createSupplier.fulfilled, (state, {payload}) => {
      state.suppliers = payload.content
      state.isLoading = false
    })
    builder.addCase(createSupplier.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editSupplier.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editSupplier.fulfilled, (state, {payload}) => {
      state.suppliers = payload.content
      state.isLoading = false
    })
    builder.addCase(editSupplier.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteSupplier.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteSupplier.fulfilled, (state, {payload}) => {
      state.suppliers = payload.content
      state.isLoading = false
    })
  }
})

export default suppliersSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = suppliersSlice.actions
