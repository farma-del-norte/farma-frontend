import {createAsyncThunk} from '@reduxjs/toolkit'
import { createService, getService, editService, deleteService, getServicesByMaintenanceId } from 'src/services/maintenances/services'
import {openSnackBar} from 'src/store/notifications'
import { MAINTENANCES_LOCALE } from 'src/utils/constants'

export const getServices = createAsyncThunk('/services-cat/getServices', async thunkApi => {
  try {
    const payload = await getService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const getServicesByMaintenancesId = createAsyncThunk('/services-cat/getServicesByMaintenanceId', async (id, thunkApi) => {
  try {
    const payload = await getServicesByMaintenanceId(id)
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createServices = createAsyncThunk('/services-cat/createService', async (body, thunkApi) => {
  try {
    const payload = await createService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: MAINTENANCES_LOCALE.SERVICES_CREATE_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editServices = createAsyncThunk('/services-cat/editService', async (body, thunkApi) => {
  try {
    const payload = await editService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: MAINTENANCES_LOCALE.SERVICES_EDIT_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteServices = createAsyncThunk('/services-cat/deleteService', async ({id}, thunkApi) => {
  try {
    const payload = await deleteService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: MAINTENANCES_LOCALE.SERVICES_DELETE_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})