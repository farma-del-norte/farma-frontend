import {createAsyncThunk} from '@reduxjs/toolkit'
import {t} from 'i18next'
import {
  createDimensionCatService,
  deleteDimensionCatService,
  editDimensionCatService,
  getDimensionsCatService
} from 'src/services/catalogs/dimensions'
import {openSnackBar} from 'src/store/notifications'

export const getDimensionsCat = createAsyncThunk('/dimensions-cat/getDimensionsCat', async thunkApi => {
  try {
    const payload = await getDimensionsCatService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createDimensionCat = createAsyncThunk('/dimensions-cat/createDimensionCat', async (body, thunkApi) => {
  try {
    const payload = await createDimensionCatService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('dimensions_cat_create_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editDimensionCat = createAsyncThunk('/dimensions-cat/editDimensionCat', async (body, thunkApi) => {
  try {
    const payload = await editDimensionCatService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('dimensions_cat_edit_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteDimensionCat = createAsyncThunk('/dimensions-cat/deleteDimensionCat', async ({id}, thunkApi) => {
  try {
    const payload = await deleteDimensionCatService(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('dimensions_cat_delete_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
