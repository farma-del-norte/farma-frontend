import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

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
  extraReducers: builder => {}
})

export default maintenanceSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = maintenanceSlice.actions
