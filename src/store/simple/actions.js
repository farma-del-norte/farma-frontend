import {createAsyncThunk} from '@reduxjs/toolkit'
import {t} from 'i18next'
import { get, create, edit, del } from 'src/services/simple/globalCalls'
import toast from 'react-hot-toast'

export const getCall = createAsyncThunk('/service/get', async (params, thunkApi) => {
  try {
    const payload = await get(params)
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createCall = createAsyncThunk('/service/create', async (params, thunkApi) => {
  try {
    const payload = await create(params)
    toast.success(t('maintenances_cat_create_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editCall = createAsyncThunk('/service/edit', async (params, thunkApi) => {
  try {
    const payload = await edit(params)
    toast.success(t('maintenances_edit_message', {ns: 'maintenances'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteCall = createAsyncThunk('/service/delete', async (params, thunkApi) => {
  try {
    const payload = await del(params)
    toast.success('eliminado con exito')
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
