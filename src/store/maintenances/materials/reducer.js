import {createSlice} from '@reduxjs/toolkit'
import {createMaterial, editMaterial, getMaterial, deleteMaterial, getMaterialsByServices} from './actions'

const initialState = {
  isLoading: false,
  materials: [],
  isModalOpen: false,
  isEditing: false,
  isMaterialDeleteOpen: false,
  modalDeleteMaterial: null
}

export const materials = createSlice({
  name: 'materials',
  initialState,
  reducers: {
    /* edit modal */
    toggleMaterialModal: (state, {payload}) => {
      state.isModalOpen = payload
    },
    setIsEditing: (state, {payload}) => {
      state.isEditing = payload
    },
    toggleDeleteMaterialModal: (state, {payload}) => {
      state.isMaterialDeleteOpen = payload
    },
    setMaterialDeleteItem: (state, {payload}) => {
      state.modalDeleteMaterial = payload
    }
  },
  extraReducers: builder => {
    builder.addCase(getMaterial.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getMaterial.fulfilled, (state, {payload}) => {
      state.materials = payload.content
      state.isLoading = false
    })
    builder.addCase(getMaterial.rejected, state => {
      state.isLoading = false
    })
    builder.addCase(createMaterial.pending, state => {
      state.isLoading = true
    })
    builder.addCase(createMaterial.fulfilled, (state, {payload}) => {
      state.materials = payload
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
    builder.addCase(deleteMaterial.pending, state => {
        state.isLoading = true
    })
    builder.addCase(deleteMaterial.fulfilled, (state, {payload}) => {
        state.materials = payload
        state.isLoading = false
    })
    builder.addCase(deleteMaterial.rejected, state => {
        state.isLoading = false
    })
    builder.addCase(getMaterialsByServices.pending, state => {
      state.isLoading = true
    })
    builder.addCase(getMaterialsByServices.fulfilled, (state, {payload}) => {
        state.materials = payload
        state.isLoading = false
    })
    builder.addCase(getMaterialsByServices.rejected, state => {
        state.isLoading = false
    })
  }
})

export default materials.reducer

export const {toggleMaterialModal, setIsEditing, toggleDeleteMaterialModal, setMaterialDeleteItem} = materials.actions