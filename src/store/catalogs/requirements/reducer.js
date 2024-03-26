import {createSlice} from '@reduxjs/toolkit'
import {createRequirementCat, editRequirementCat, getRequirementsCat} from './actions'

const initialState = {
  isLoading: false,
  requirementsCat: [],
  isOpen: false,
  isDeleteOpen: false,
  modalItem: null,
  modalDeleteItem: null
}

export const requirementCatsSlice = createSlice({
  name: 'requirementsCat',
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
    builder.addCase(getRequirementsCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getRequirementsCat.fulfilled, (state, {payload}) => {
      state.requirementsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(getRequirementsCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createRequirementCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createRequirementCat.fulfilled, (state, {payload}) => {
      state.requirementsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(createRequirementCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editRequirementCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editRequirementCat.fulfilled, (state, {payload}) => {
      state.requirementsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(editRequirementCat.rejected, state => {
      state.isLoading = false
    })
  }
})

export default requirementCatsSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = requirementCatsSlice.actions
