import {createSlice} from '@reduxjs/toolkit'
import {getBudgets, createBudget, editBudget, deleteBudget} from './actions'

const initialState = {
  isLoading: false,
  currentRow: [],
  budgets: [],
  isOpen: false,
  isDeleteOpen: false
}

export const budgetsSlice = createSlice({
  name: 'budgets',
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
  },
  extraReducers: builder => {
    builder.addCase(getBudgets.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getBudgets.fulfilled, (state, {payload}) => {
      state.budgets = payload.content
      state.isLoading = false
    })
    builder.addCase(getBudgets.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createBudget.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createBudget.fulfilled, (state, {payload}) => {
      state.budgets = payload.content
      state.isLoading = false
    })
    builder.addCase(createBudget.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editBudget.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editBudget.fulfilled, (state, {payload}) => {
      state.budgets = payload.content
      state.isLoading = false
    })
    builder.addCase(editBudget.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteBudget.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteBudget.fulfilled, (state, {payload}) => {
      state.budgets = payload.content
      state.isLoading = false
    })
  }
})

export default budgetsSlice.reducer

export const {toggleModal, toggleDeleteModal, setRow} = budgetsSlice.actions