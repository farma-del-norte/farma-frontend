import {createAsyncThunk} from '@reduxjs/toolkit'
import {t} from 'i18next'
import * as MaintenancesApi from 'src/services/maintenances/maintenances'
import toast from 'react-hot-toast'

export const getMaintenances = createAsyncThunk('/service/getMaintenances', async thunkApi => {
  try {
    const payload = await MaintenancesApi.getMaintenances()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createMaintenance = createAsyncThunk('/service/createMaintenance', async (body, thunkApi) => {
  try {
    const payload = await MaintenancesApi.createMaintenance(body)
    toast.success(t('maintenances_cat_create_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editMaintenance = createAsyncThunk('/service/editMaintenance', async (body, thunkApi) => {
  try {
    const payload = await MaintenancesApi.editMaintenance(body)
    toast.success(t('maintenances_edit_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteMaintenance = createAsyncThunk('/service/deleteMaintenance', async ({id}, thunkApi) => {
  try {
    const payload = await MaintenancesApi.deleteMaintenance(id)
    toast.success(t('maintenances_cat_delete_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
