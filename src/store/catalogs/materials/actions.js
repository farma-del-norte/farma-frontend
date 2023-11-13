import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import * as MaterialsAPI from 'src/services/catalogs/materials'
import {openSnackBar} from 'src/store/notifications'
import {CATALOGS_LOCALE} from 'src/utils/constants'

export const getMaterialsCat = createAsyncThunk('/materials-cat/getMaterialsCat', async thunkApi => {
  try {
    const payload = await MaterialsAPI.getMaterialsCatService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createMaterialCat = createAsyncThunk('/materials-cat/createMaterialCat', async (body, thunkApi) => {
  try {
    const payload = await MaterialsAPI.createMaterialCatService(body)
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

export const editMaterialCat = createAsyncThunk('/materials-cat/editMaterialCat', async (body, thunkApi) => {
  try {
    const payload = await MaterialsAPI.editMaterialCatService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.MATERIALS_EDIT_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteMaterialCat = createAsyncThunk('/materials-cat/deleteMaterialCat', async ({id}, thunkApi) => {
  try {
    const payload = await MaterialsAPI.deleteMaterialCatService(id)
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
