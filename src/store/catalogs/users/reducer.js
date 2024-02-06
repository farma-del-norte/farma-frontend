import {createSlice} from '@reduxjs/toolkit'
import {createUser, editUser, getUsers, deleteUser} from './actions'

const initialState = {
  isLoading: false,
  users: [],
  editUser: {},
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null,
  error: null
}

// MARK: - Reducer
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
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
    builder.addCase(getUsers.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getUsers.fulfilled, (state, {payload}) => {
      state.users = payload.content
      state.isLoading = false
    })
    builder.addCase(getUsers.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createUser.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createUser.fulfilled, (state, {payload}) => {
      state.users = payload.content
      state.isLoading = false
    })
    builder.addCase(createUser.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editUser.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editUser.fulfilled, (state, {payload}) => {
      state.users = payload.content
      state.isLoading = false
    })
    builder.addCase(editUser.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteUser.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteUser.fulfilled, (state, {payload}) => {
      state.users = payload.content
      state.isLoading = false
    })
    builder.addCase(deleteUser.rejected, state => {
      state.isLoading = false
    })
  }
})

export default usersSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = usersSlice.actions
