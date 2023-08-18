import {createSlice} from '@reduxjs/toolkit'
import {createRequirement, editRequirement, getRequirements} from './actions'

const initialState = {
  isLoading: false,
  requirements: [],
  isOpen: false,
  isDeleteOpen: false,
  modalItem: null,
  modalDeleteItem: null
}

export const requirementsSlice = createSlice({
  name: 'requirements',
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
    builder.addCase(getRequirements.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getRequirements.fulfilled, (state, {payload}) => {
      state.requirements = payload.content
      state.isLoading = false
    })
    builder.addCase(getRequirements.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createRequirement.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createRequirement.fulfilled, (state, {payload}) => {
      state.requirements = payload.content
      state.isLoading = false
    })
    builder.addCase(createRequirement.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editRequirement.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editRequirement.fulfilled, (state, {payload}) => {
      state.requirements = payload.content
      state.isLoading = false
    })
    builder.addCase(editRequirement.rejected, state => {
      state.isLoading = false
    })
  }
})

export default requirementsSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = requirementsSlice.actions
