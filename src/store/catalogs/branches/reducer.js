import {createSlice} from '@reduxjs/toolkit'
import {addBranchDetails, deleteBranch, editBranch, getBranchDetails, getBranches, updateBranchDetails} from './actions'

const initialState = {
  isLoading: false,
  isModalLoading: false,
  branches: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null,
  isDetailsModalOpen: false,
  activeBranch: null,
  isDetailsFormOpen: false,
  branchDetails: {}
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
    setIsDetailsModalOpen: (state, {payload}) => {
      state.isDetailsModalOpen = payload
    },
    setBranchDetails: (state, {payload}) => {
      state.branchDetails = payload
    },
    setIsDetailsFormModalOpen: (state, {payload}) => {
      state.isDetailsFormOpen = payload
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
    builder.addCase(getBranchDetails.pending, state => {
      state.isModalLoading = true
    })
    builder.addCase(getBranchDetails.fulfilled, (state, {payload}) => {
      state.isModalLoading = false
      state.branchDetails = payload.content[0]
    })
    builder.addCase(getBranchDetails.rejected, state => {
      state.isModalLoading = false
    })
    builder.addCase(addBranchDetails.pending, state => {
      state.isModalLoading = true
    })
    builder.addCase(addBranchDetails.fulfilled, (state, {payload}) => {
      state.isModalLoading = false
      state.branchDetails = payload.content
    })
    builder.addCase(addBranchDetails.rejected, state => {
      state.isModalLoading = false
    })
    builder.addCase(updateBranchDetails.pending, state => {
      state.isModalLoading = true
    })
    builder.addCase(updateBranchDetails.fulfilled, (state, {payload}) => {
      state.isModalLoading = false
      state.branchDetails = payload.content
    })
    builder.addCase(updateBranchDetails.rejected, state => {
      state.isModalLoading = false
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
  setIsDetailsModalOpen,
  setBranchDetails,
  setIsDetailsFormModalOpen
} = branchesSlice.actions
