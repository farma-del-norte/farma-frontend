import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {createVariable, editVariable, getVariables} from './actions'

const initialState = {
  isLoading: false,
  variables: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const variablesSlice = createSlice({
  name: 'variables',
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
    builder.addCase(getVariables.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getVariables.fulfilled, (state, {payload}) => {
      state.variables = payload.content
      state.isLoading = false
    })
    builder.addCase(getVariables.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createVariable.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createVariable.fulfilled, (state, {payload}) => {
      state.variables = payload.content
      state.isLoading = false
    })
    builder.addCase(createVariable.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editVariable.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editVariable.fulfilled, (state, {payload}) => {
      state.variables = payload.content
      state.isLoading = false
    })
    builder.addCase(editVariable.rejected, state => {
      state.isLoading = false
    })
  }
})

export default variablesSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = variablesSlice.actions
