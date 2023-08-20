import {createSlice} from '@reduxjs/toolkit'
import {createMaterial, editMaterial, getMaterials} from './actions'

const initialState = {
  isLoading: false,
  materials: [],
  isOpen: false,
  modalItem: null,
  isDeleteOpen: false,
  modalDeleteItem: null
}

export const materialsSlice = createSlice({
  name: 'materials',
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
    builder.addCase(getMaterials.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getMaterials.fulfilled, (state, {payload}) => {
      state.materials = payload.content
      state.isLoading = false
    })
    builder.addCase(getMaterials.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createMaterial.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createMaterial.fulfilled, (state, {payload}) => {
      state.materials = payload.content
      state.isLoading = false
    })
    builder.addCase(createMaterial.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(editMaterial.pending, state => {
      state.isLoading = true
    })
    builder.addCase(editMaterial.fulfilled, (state, {payload}) => {
      state.materials = payload.content
      state.isLoading = false
    })
    builder.addCase(editMaterial.rejected, state => {
      state.isLoading = false
    })
  }
})

export default materialsSlice.reducer

export const {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} = materialsSlice.actions
