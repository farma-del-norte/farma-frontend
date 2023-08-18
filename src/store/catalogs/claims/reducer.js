import {createSlice} from '@reduxjs/toolkit'
import {createClaim, editClaim, getClaims} from './actions'

const initialState = {
  isLoading: false,
  claims: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const claimsSlice = createSlice({
  name: 'claims',
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
    builder.addCase(getClaims.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getClaims.fulfilled, (state, {payload}) => {
      state.claims = payload.content
      state.isLoading = false
    })
    builder.addCase(getClaims.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createClaim.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createClaim.fulfilled, (state, {payload}) => {
      state.claims = payload.content
      state.isLoading = false
    })
    builder.addCase(createClaim.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editClaim.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editClaim.fulfilled, (state, {payload}) => {
      state.claims = payload.content
      state.isLoading = false
    })
    builder.addCase(editClaim.rejected, state => {
      state.isLoading = false
    })
  }
})

export default claimsSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = claimsSlice.actions
