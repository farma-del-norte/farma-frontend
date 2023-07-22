import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

const initialState = {
  isLoaded: 'idle',
  concepts: [],

  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const conceptsSlice = createSlice({
  name: 'concepts',
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

export default conceptsSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = conceptsSlice.actions
