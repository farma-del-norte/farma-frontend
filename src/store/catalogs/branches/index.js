import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isLoaded: 'idle',
  branches: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
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
    }
  },
  extraReducers: builder => {}
})

export default branchesSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem, setBranchesData} = branchesSlice.actions
