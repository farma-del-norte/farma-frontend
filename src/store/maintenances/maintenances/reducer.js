import {createSlice} from '@reduxjs/toolkit'
import {getMaintenances, createMaintenance, editMaintenance, deleteMaintenance} from './actions'

const initialState = {
  isLoading: false,
  maintenances: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const maintenancesSlice = createSlice({
  name: 'maintenances',
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
    builder.addCase(getMaintenances.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getMaintenances.fulfilled, (state, {payload}) => {
      state.maintenances = payload.content
      state.isLoading = false
    })
    builder.addCase(getMaintenances.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createMaintenance.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createMaintenance.fulfilled, (state, {payload}) => {
      state.maintenances = payload.content
      state.isLoading = false
    })
    builder.addCase(createMaintenance.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editMaintenance.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editMaintenance.fulfilled, (state, {payload}) => {
      state.maintenances = payload.content
      state.isLoading = false
    })
    builder.addCase(editMaintenance.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteMaintenance.pending, state => {
      state.isLoading = true
    })
    builder.addCase(deleteMaintenance.fulfilled, (state, {payload}) => {
      state.maintenances = payload.content
      state.isLoading = false
    })
  }
})

export default maintenancesSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = maintenancesSlice.actions