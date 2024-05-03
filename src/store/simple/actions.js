import {createAsyncThunk} from '@reduxjs/toolkit'
import {t} from 'i18next'
import { get, create, edit, del } from 'src/services/simple/globalCalls'
import toast from 'react-hot-toast'

export const getCall = createAsyncThunk('/service/getMaintenances', async thunkApi => {
  try {
    const payload = await get()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createCall = createAsyncThunk('/service/createMaintenance', async (body, thunkApi) => {
  try {
    const payload = await create(body)
    toast.success(t('maintenances_cat_create_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editCall = createAsyncThunk('/service/editMaintenance', async (body, thunkApi) => {
  try {
    const payload = await edit(body)
    toast.success(t('maintenances_edit_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteCall = createAsyncThunk('/service/deleteMaintenance', async ({id}, thunkApi) => {
  try {
    const payload = await del(id)
    toast.success(t('maintenances_cat_delete_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
