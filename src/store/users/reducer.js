import {createSlice} from '@reduxjs/toolkit'
import {createUser, editUser, getUsers, getUsersLogin} from './actions'

const initialState = {
  isLoading: false,
  user: [],
  users: [],
  editUser: {},
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null,
  error: null,
  showVerificationModal: false,
  showInputPasswords: false
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
    },
    setVerificationModal: (state, {payload}) => {
      state.showVerificationModal = payload
    },
    setInputPasswords: (state, {payload}) => {
      state.showInputPasswords = payload
    },
    setIsLoading: (state, {payload}) => {
      state.isLoading = payload
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
    builder.addCase(getUsersLogin.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getUsersLogin.fulfilled, (state, {payload}) => {
      localStorage.setItem('im-user', JSON.stringify(payload.content.token))
      state.user = payload.content.user
      state.isLoading = false
    })
    builder.addCase(getUsersLogin.rejected, state => {
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
  }
})

export default usersSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem, setVerificationModal, setInputPasswords, setIsLoading} = usersSlice.actions
