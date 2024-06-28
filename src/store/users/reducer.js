import {createSlice} from '@reduxjs/toolkit'
import {createUser, editUser, getUsers, deleteUserService, getUsersLogin} from 'src/store/users/actions'

const initialState = {
  isLoading: false,
  currentRow: [],
  user: {},
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
    },
    setRow: (state, {payload}) => {
      state.currentRow = payload
    },
    setUser: (state, {payload}) => {
      console.log('Reducer', payload)
      const {content} = payload
      localStorage.setItem('im-user', content.token)
      state.user = content.user
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
      console.log('extraReducer')
      state.isLoading = true
    })
    builder.addCase(getUsersLogin.fulfilled, (state, {payload}) => {
      console.log('extraReducer', payload)
      const {content} = payload
      localStorage.setItem('im-user', content.token)
      state.user = content.user
      state.isLoading = false
    })
    builder.addCase(getUsersLogin.rejected, state => {
      console.log('rejected')
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
    builder.addCase(deleteUserService.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteUserService.fulfilled, (state, {payload}) => {
      state.users = payload.content
      state.isLoading = false
    })
    builder.addCase(deleteUserService.rejected, state => {
      state.isLoading = false
    })
  }
})

export default usersSlice.reducer

export const {
  toggleModal,
  setModalItem,
  toggleDeleteModal,
  setDeleteItem,
  setVerificationModal,
  setInputPasswords,
  setIsLoading,
  setRow,
  setUser
} = usersSlice.actions
