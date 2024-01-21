import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import * as MaintenancesApi from 'src/services/maintenances/maintenances'
import {openSnackBar} from 'src/store/notifications'
import {MAINTENANCES_LOCALE} from 'src/utils/constants'

export const getMaintenances = createAsyncThunk('/service/getMaintenances', async thunkApi => {
  try {
    const payload = await MaintenancesApi.getMaintenances()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createMaintenance = createAsyncThunk('/service/createMaintenance', async (body, thunkApi) => {
  try {
    const payload = await MaintenancesApi.createMaintenance(body)
    thunkApi.dispatch(openSnackBar({open: true, message: MAINTENANCES_LOCALE.MAINTENANCES_CREATE_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editMaintenance = createAsyncThunk('/service/editMaintenance', async (body, thunkApi) => {
  try {
    const payload = await MaintenancesApi.editMaintenance(body)
    thunkApi.dispatch(openSnackBar({open: true, message: MAINTENANCES_LOCALE.MAINTENANCES_EDIT_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteMaintenance = createAsyncThunk('/service/deleteMaintenance', async ({id}, thunkApi) => {
  try {
    const payload = await MaintenancesApi.deleteMaintenance(id)
    thunkApi.dispatch(openSnackBar({open: true, message: MAINTENANCES_LOCALE.MAINTENANCES_DELETE_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})