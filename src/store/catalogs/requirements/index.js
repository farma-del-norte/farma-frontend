import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  isLoaded: 'idle',
  data: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const requirementsSlice = createSlice({
  name: 'requirements',
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

export default requirementsSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = requirementsSlice.actions
