import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {
  createServiceCatService,
  deleteServiceCatService,
  editServiceCatService,
  getServiceCatService
} from 'src/services/catalogs/service'
import {openSnackBar} from 'src/store/notifications'
import {CATALOGS_LOCALE} from 'src/utils/constants'

export const getServicesCat = createAsyncThunk('/services-cat/getServicesCat', async thunkApi => {
  try {
    const payload = await getServiceCatService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createServiceCat = createAsyncThunk('/services-cat/createServiceCat', async (body, thunkApi) => {
  try {
    const payload = await createServiceCatService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.SERVICE_CREATE_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editServiceCat = createAsyncThunk('/services-cat/editServiceCat', async (body, thunkApi) => {
  try {
    const payload = await editServiceCatService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.SERVICE_EDIT_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteServiceCat = createAsyncThunk('/services-cat/deleteServiceCat', async ({id}, thunkApi) => {
  try {
    const payload = await deleteServiceCatService(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.SERVICE_DELETE_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
