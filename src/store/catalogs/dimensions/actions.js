import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {
  createDimensionService,
  deleteDimensionService,
  editDimensionService,
  getDimensionsService
} from 'src/services/catalogs/dimensions'
import {openSnackBar} from 'src/store/notifications'
import i18n from 'src/configs/i18n'

const localeNameSpace = {ns: 'catalogs'}

export const getDimensions = createAsyncThunk('/dimensions/getDimensions', async thunkApi => {
  try {
    const payload = await getDimensionsService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createDimension = createAsyncThunk('/dimensions/createDimension', async (body, thunkApi) => {
  try {
    const payload = await createDimensionService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: i18n.t('dimensions_create_message', localeNameSpace), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editDimension = createAsyncThunk('/dimensions/editDimension', async (body, thunkApi) => {
  try {
    const payload = await editDimensionService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: i18n.t('dimensions_edit_message', localeNameSpace), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteDimension = createAsyncThunk('/dimensions/getDimensions', async ({id}, thunkApi) => {
  try {
    const payload = await deleteDimensionService(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: i18n.t('dimensions_delete_message', localeNameSpace), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: 'errMessage', severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
