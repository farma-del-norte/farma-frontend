import {createSlice} from '@reduxjs/toolkit'
import {createConcept, editConcept, getConcepts} from './actions'

const initialState = {
  isLoading: false,
  concepts: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const conceptsSlice = createSlice({
  name: 'concepts',
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
    builder.addCase(getConcepts.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getConcepts.fulfilled, (state, {payload}) => {
      state.concepts = payload.content
      state.isLoading = false
    })
    builder.addCase(getConcepts.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createConcept.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createConcept.fulfilled, (state, {payload}) => {
      state.concepts = payload.content
      state.isLoading = false
    })
    builder.addCase(createConcept.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editConcept.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editConcept.fulfilled, (state, {payload}) => {
      state.concepts = payload.content
      state.isLoading = false
    })
    builder.addCase(editConcept.rejected, state => {
      state.isLoading = false
    })
  }
})

export default conceptsSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = conceptsSlice.actions
