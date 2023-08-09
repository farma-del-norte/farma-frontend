import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  isLoaded: 'idle',
  data: [],
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
  extraReducers: builder => {}
})

export default zonesSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = zonesSlice.actions
