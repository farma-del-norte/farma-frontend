import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {
  createMaintenanceService,
  deleteMaintenanceService,
  editMaintenanceService,
  getMaintenanceService
} from 'src/services/catalogs/maintenance'
import {openSnackBar} from 'src/store/notifications'
import {maintenance_locale} from 'src/utils/locales/catalogs/localization'

export const getMaintenances = createAsyncThunk('/maintenance/getMaintenance', async thunkApi => {
  try {
    const payload = await getMaintenanceService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createMaintenance = createAsyncThunk('/maintenance/createMaintenance', async (body, thunkApi) => {
  try {
    const payload = await createMaintenanceService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: maintenance_locale.create_success, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editMaintenance = createAsyncThunk('/maintenance/editMaintenance', async (body, thunkApi) => {
  try {
    const payload = await editMaintenanceService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: maintenance_locale.edit_success, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteMaintenance = createAsyncThunk('/maintenance/getMaintenances', async ({id}, thunkApi) => {
  try {
    const payload = await deleteMaintenanceService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: maintenance_locale.delete_success, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
