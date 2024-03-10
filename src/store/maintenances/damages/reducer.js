import {createSlice} from '@reduxjs/toolkit'
import {createDamage, editDamage, getDamages} from './actions'

const initialState = {
  isLoading: false,
  damages: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const damagesSlice = createSlice({
  name: 'damages',
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
    builder.addCase(getDamages.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getDamages.fulfilled, (state, {payload}) => {
      state.damages = payload.content
      state.isLoading = false
    })
    builder.addCase(getDamages.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createDamage.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createDamage.fulfilled, (state, {payload}) => {
      state.damages = payload.content
      state.isLoading = false
    })
    builder.addCase(createDamage.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editDamage.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editDamage.fulfilled, (state, {payload}) => {
      state.damages = payload.content
      state.isLoading = false
    })
    builder.addCase(editDamage.rejected, state => {
      state.isLoading = false
    })
  }
})

export default damagesSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = damagesSlice.actions
