import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {createVariableCat, editVariableCat, getVariablesCat, deleteVariableCat} from './actions'

const initialState = {
  isLoading: false,
  variablesCat: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const variablesCatSlice = createSlice({
  name: 'variablesCat',
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
    builder.addCase(getVariablesCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getVariablesCat.fulfilled, (state, {payload}) => {
      state.variablesCat = payload.content
      state.isLoading = false
    })
    builder.addCase(getVariablesCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createVariableCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createVariableCat.fulfilled, (state, {payload}) => {
      state.variablesCat = payload.content
      state.isLoading = false
    })
    builder.addCase(createVariableCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editVariableCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editVariableCat.fulfilled, (state, {payload}) => {
      state.variablesCat = payload.content
      state.isLoading = false
    })
    builder.addCase(editVariableCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteVariableCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteVariableCat.fulfilled, (state, {payload}) => {
      state.variablesCat = payload.content
      state.isLoading = false
    })
    builder.addCase(deleteVariableCat.rejected, state => {
      state.isLoading = false
    })
  }
})

export default variablesCatSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = variablesCatSlice.actions
