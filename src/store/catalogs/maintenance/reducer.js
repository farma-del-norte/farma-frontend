import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {createMaintenance, editMaintenance, getMaintenances} from './actions'

const initialState = {
  isLoading: false,
  maintenance: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const maintenanceSlice = createSlice({
  name: 'maintenance',
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
      state.maintenance = payload.content
      state.isLoading = false
    })
    builder.addCase(getMaintenances.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createMaintenance.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createMaintenance.fulfilled, (state, {payload}) => {
      state.maintenance = payload.content
      state.isLoading = false
    })
    builder.addCase(createMaintenance.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editMaintenance.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editMaintenance.fulfilled, (state, {payload}) => {
      state.maintenance = payload.content
      state.isLoading = false
    })
    builder.addCase(editMaintenance.rejected, state => {
      state.isLoading = false
    })
  }
})

export default maintenanceSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = maintenanceSlice.actions
