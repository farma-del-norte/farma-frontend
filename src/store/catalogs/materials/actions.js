import {createAsyncThunk} from '@reduxjs/toolkit'
import {t} from 'i18next'
import * as MaterialsAPI from 'src/services/catalogs/materials'
import {openSnackBar} from 'src/store/notifications'

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
      openSnackBar({open: true, message: t('materials_cat_create_message', {ns: 'catalogs'}), severity: 'success'})
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
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('materials_cat_edit_message', {ns: 'catalogs'}), severity: 'success'})
    )
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
      openSnackBar({open: true, message: t('materials_cat_delete_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
