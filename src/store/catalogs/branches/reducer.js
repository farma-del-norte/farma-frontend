import {createSlice} from '@reduxjs/toolkit'
import {deleteBranch, editBranch, getBranches} from './actions'

const initialState = {
  isLoading: false,
  branches: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null,
  isDetailsOpen: false,
  activeBranch: null
}

export const branchesSlice = createSlice({
  name: 'branches',
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
    setBranchesData: (state, {payload}) => {
      state.branches = payload
    },
    setActiveBranch: (state, {payload}) => {
      state.activeBranch = payload
    },
    setIsDetailsOpen: (state, {payload}) => {
      state.isDetailsOpen = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getBranches.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getBranches.fulfilled, (state, {payload}) => {
      state.branches = payload.content
      state.isLoading = false
    })
    builder.addCase(getBranches.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editBranch.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editBranch.fulfilled, (state, {payload}) => {
      state.branches = payload.content
      state.isLoading = false
    })
    builder.addCase(editBranch.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteBranch.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteBranch.fulfilled, (state, {payload}) => {
      state.branches = payload.content
      state.isLoading = false
    })
    builder.addCase(deleteBranch.rejected, state => {
      state.isLoading = false
    })
  }
})

export default branchesSlice.reducer

export const {
  toggleModal,
  setModalItem,
  toggleDeleteModal,
  setDeleteItem,
  setBranchesData,
  setActiveBranch,
  setIsDetailsOpen
} = branchesSlice.actions
