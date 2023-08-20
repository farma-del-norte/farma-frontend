import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {
  createMaterialService,
  deleteMaterialService,
  editMaterialService,
  getMaterialsService
} from 'src/services/catalogs/materials'
import {openSnackBar} from 'src/store/notifications'
import {materials_locale} from 'src/utils/locales/catalogs/localization'

export const getMaterials = createAsyncThunk('/materials/getMaterials', async thunkApi => {
  try {
    const payload = await getMaterialsService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createMaterial = createAsyncThunk('/materials/createMaterial', async (body, thunkApi) => {
  try {
    const payload = await createMaterialService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: materials_locale.create_success, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editMaterial = createAsyncThunk('/materials/editMaterial', async (body, thunkApi) => {
  try {
    const payload = await editMaterialService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: materials_locale.edit_success, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteMaterial = createAsyncThunk('/materials/getMaterials', async ({id}, thunkApi) => {
  try {
    const payload = await deleteMaterialService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: materials_locale.delete_success, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
