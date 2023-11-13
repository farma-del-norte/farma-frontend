import {createSlice} from '@reduxjs/toolkit'
import {createMaterialCat, editMaterialCat, getMaterialsCat} from './actions'

const initialState = {
  isLoading: false,
  materialsCat: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const materialsCatSlice = createSlice({
  name: 'materialsCat',
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
    builder.addCase(getMaterialsCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getMaterialsCat.fulfilled, (state, {payload}) => {
      state.materialsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(getMaterialsCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createMaterialCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createMaterialCat.fulfilled, (state, {payload}) => {
      state.materialsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(createMaterialCat.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editMaterialCat.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editMaterialCat.fulfilled, (state, {payload}) => {
      state.materialsCat = payload.content
      state.isLoading = false
    })
    builder.addCase(editMaterialCat.rejected, state => {
      state.isLoading = false
    })
  }
})

export default materialsCatSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = materialsCatSlice.actions
