import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import * as MaterialsAPI from 'src/services/catalogs/materials'
import {openSnackBar} from 'src/store/notifications'
import {CATALOGS_LOCALE} from 'src/utils/constants'

export const getMaterials = createAsyncThunk('/materials/getMaterials', async thunkApi => {
  try {
    const payload = await MaterialsAPI.getMaterialsService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createMaterial = createAsyncThunk('/materials/createMaterial', async (body, thunkApi) => {
  try {
    const payload = await MaterialsAPI.createMaterialService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.MATERIALS_CREATE_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editMaterial = createAsyncThunk('/materials/editMaterial', async (body, thunkApi) => {
  try {
    const payload = await MaterialsAPI.editMaterialService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.MATERIALS_EDIT_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteMaterial = createAsyncThunk('/materials/deleteMaterials', async ({id}, thunkApi) => {
  try {
    const payload = await MaterialsAPI.deleteMaterialService(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.MATERIALS_DELETE_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
