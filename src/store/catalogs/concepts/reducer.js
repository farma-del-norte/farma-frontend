import {createSlice} from '@reduxjs/toolkit'
import {createConceptCat, editConceptCat, getConceptsCat, deleteConceptCat} from './actions'

const initialState = {
  currentRow: [],
  isLoading: false,
  conceptsCat: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const conceptsCatSlice = createSlice({
  name: 'conceptsCat',
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
    },
    setRow: (state, {payload}) => {
      state.currentRow = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getConceptsCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getConceptsCat.fulfilled, (state, {payload}) => {
      state.conceptsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(getConceptsCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createConceptCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createConceptCat.fulfilled, (state, {payload}) => {
      state.conceptsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(createConceptCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editConceptCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editConceptCat.fulfilled, (state, {payload}) => {
      state.conceptsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(editConceptCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteConceptCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteConceptCat.fulfilled, (state, {payload}) => {
      state.conceptsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(deleteConceptCat.rejected, state => {
      state.isLoading = false
    })
  }
})

export default conceptsCatSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem, setRow} = conceptsCatSlice.actions
