import {createSlice} from '@reduxjs/toolkit'
import {createZone, editZone, getZones} from './actions'

const initialState = {
  isLoading: false,
  zones: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const zonesSlice = createSlice({
  name: 'zones',
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
    builder.addCase(getZones.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getZones.fulfilled, (state, {payload}) => {
      state.zones = payload.content
      state.isLoading = false
    })
    builder.addCase(getZones.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createZone.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createZone.fulfilled, (state, {payload}) => {
      state.zones = payload.content
      state.isLoading = false
    })
    builder.addCase(createZone.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editZone.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editZone.fulfilled, (state, {payload}) => {
      state.zones = payload.content
      state.isLoading = false
    })
    builder.addCase(editZone.rejected, state => {
      state.isLoading = false
    })
  }
})

export default zonesSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = zonesSlice.actions
