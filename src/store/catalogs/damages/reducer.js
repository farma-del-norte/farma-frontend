import {createSlice} from '@reduxjs/toolkit'
import {createDamageCat, editDamageCat, getDamagesCat, deleteDamageCat} from './actions'

const initialState = {
  currentRow: [],
  isLoading: false,
  damagesCat: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const damagesCatSlice = createSlice({
  name: 'damagesCat',
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
    setRow: (state, {payload}) => {
      state.currentRow = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getDamagesCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getDamagesCat.fulfilled, (state, {payload}) => {
      state.damagesCat = payload.content
      state.isLoading = false
    })
    builder.addCase(getDamagesCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createDamageCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createDamageCat.fulfilled, (state, {payload}) => {
      state.damagesCat = payload.content
      state.isLoading = false
    })
    builder.addCase(createDamageCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editDamageCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editDamageCat.fulfilled, (state, {payload}) => {
      state.damagesCat = payload.content
      state.isLoading = false
    })
    builder.addCase(editDamageCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteDamageCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteDamageCat.fulfilled, (state, {payload}) => {
      state.damagesCat = payload.content
      state.isLoading = false
    })
    builder.addCase(deleteDamageCat.rejected, state => {
      state.isLoading = false
    })
  }
})

export default damagesCatSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem, setRow} = damagesCatSlice.actions
