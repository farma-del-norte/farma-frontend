import {createSlice} from '@reduxjs/toolkit'
import {getCall, createCall, editCall, deleteCall} from './actions'

const initialState = {
  mainEndpoint: null,
  lists: {
    prueba: [],
    Prueba2: [],
  },
}

export const simpleSlice = createSlice({
  name: 'simple',
  initialState,
  reducers: {
    /* edit modal */
    toggleModal: (state, {payload}) => {
      state.isOpen = payload
    },
    toggleDeleteModal: (state, {payload}) => {
      state.isDeleteOpen = payload
    },
    setRow: (state, {payload}) => {
      state.currentRow = payload
    },
    setEndpoint: (state, {payload}) => {
      
    }
  },
  extraReducers: builder => {
    builder.addCase(getCall.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getCall.fulfilled, (state, {payload}) => {
      state.budgets = payload.content
      state.isLoading = false
    })
    builder.addCase(getCall.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createCall.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createCall.fulfilled, (state, {payload}) => {
      state.budgets = payload.content
      state.isLoading = false
    })
    builder.addCase(createCall.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editCall.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editCall.fulfilled, (state, {payload}) => {
      state.budgets = payload.content
      state.isLoading = false
    })
    builder.addCase(editCall.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteCall.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteCall.fulfilled, (state, {payload}) => {
      state.budgets = payload.content
      state.isLoading = false
    })
  }
})

export default simpleSlice.reducer

export const mainEndpoint = state => state.mainEndpoint;

export const {toggleModal, toggleDeleteModal, setRow} = simpleSlice.actions