import {createSlice} from '@reduxjs/toolkit'
import {createServices, editServices, getServices, deleteServices, getServicesByMaintenancesId} from './actions'

const initialState = {
  isLoading: false,
  services: [],
  createdService: {},
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const services = createSlice({
  name: 'services',
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
    builder.addCase(getServices.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getServices.fulfilled, (state, {payload}) => {
      state.services = payload.content
      state.isLoading = false
    })
    builder.addCase(getServices.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createServices.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createServices.fulfilled, (state, {payload}) => {
      console.log(payload)
      state.createdService = payload.createdService.content[0]
      state.services = payload.payload.content
      state.isLoading = false
    })
    builder.addCase(createServices.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editServices.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editServices.fulfilled, (state, {payload}) => {
      state.services = payload.content
      state.isLoading = false
    })
    builder.addCase(editServices.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(deleteServices.pending, state => {
        state.isLoading = true
    })
    builder.addCase(deleteServices.fulfilled, (state, {payload}) => {
        state.services = payload.content
        state.isLoading = false
    })
    builder.addCase(deleteServices.rejected, state => {
        state.isLoading = false
    })
    builder.addCase(getServicesByMaintenancesId.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getServicesByMaintenancesId.fulfilled, (state, {payload}) => {
        if(Array.isArray(payload.content)) {
          state.services = payload.content
        }
        state.isLoading = false
    })
    builder.addCase(getServicesByMaintenancesId.rejected, state => {
        state.isLoading = false
    })
  }
})

export default services.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = services.actions