import {createAsyncThunk} from '@reduxjs/toolkit'
import {createService, getService, editService, deleteService} from 'src/services/maintenances/services'
import toast from 'react-hot-toast'
import {MAINTENANCES_LOCALE} from 'src/utils/constants'

export const getServices = createAsyncThunk('/services-cat/getServices', async thunkApi => {
  try {
    const payload = await getService()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createServices = createAsyncThunk('/services-cat/createService', async (body, thunkApi) => {
  try {
    const payload = await createService(body)
    toast.success(MAINTENANCES_LOCALE.SERVICES_CREATE_MESSAGE)
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editServices = createAsyncThunk('/services-cat/editService', async (body, thunkApi) => {
  try {
    const payload = await editService(body)
    toast.success(MAINTENANCES_LOCALE.SERVICES_EDIT_MESSAGE)
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteServices = createAsyncThunk('/services-cat/deleteService', async ({id}, thunkApi) => {
  try {
    const payload = await deleteService(id)
    toast.success(MAINTENANCES_LOCALE.SERVICES_DELETE_MESSAGE)
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
