import {createAsyncThunk} from '@reduxjs/toolkit'
import { getMaterialsService, createMaterialService, editMaterialService, deleteMaterialService } from 'src/services/maintenances/materials'
import {openSnackBar} from 'src/store/notifications'
import {t} from 'i18next'

export const getMaterial = createAsyncThunk('/materials/getMaterials', async thunkApi => {
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
    thunkApi.dispatch(openSnackBar({open: true, message: t('materials:create_message', {ns: 'maintenances'}), severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editMaterial = createAsyncThunk('/materials/editService', async (body, thunkApi) => {
  try {
    const payload = await editMaterialService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: t('materials:edit_message', {ns: 'maintenances'}), severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteMaterial = createAsyncThunk('/materials/deleteService', async ({id}, thunkApi) => {
  try {
    const payload = await deleteMaterialService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: t('materials:delete_message', {ns: 'maintenances'}), severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})