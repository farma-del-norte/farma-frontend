import {createAsyncThunk} from '@reduxjs/toolkit'
import {
  getMaterialsService,
  createMaterialService,
  editMaterialService,
  deleteMaterialService
} from 'src/services/maintenances/materials'
import toast from 'react-hot-toast'
import {t} from 'i18next'

export const getMaterial = createAsyncThunk('/materials/getMaterials', async thunkApi => {
  try {
    const payload = await getMaterialsService()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const getMaterialsByServices = createAsyncThunk('/materials/getMaterialsByService', async (services, thunkApi) => {
  try {
    let materials = []
    for( service in services) {
      const payload = await getMaterialsByService(service.id)
      materials = materials.concat(payload.content);
    }
    return materials
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createMaterial = createAsyncThunk('/materials/createMaterial', async (body, thunkApi) => {
  try {
    const payload = await createMaterialService(body)
    toast.success(t('materials:create_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editMaterial = createAsyncThunk('/materials/editService', async (body, thunkApi) => {
  try {
    const payload = await editMaterialService(body)
    toast.success(t('materials:edit_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteMaterial = createAsyncThunk('/materials/deleteService', async ({id}, thunkApi) => {
  try {
    const payload = await deleteMaterialService(id)
    toast.success(t('materials:delete_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
