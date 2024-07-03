import {createAsyncThunk} from '@reduxjs/toolkit'
import {get, create, edit, del} from 'src/services/simple/globalCalls'
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
    toast.success('Creado con éxito')
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editCall = createAsyncThunk('/service/edit', async (params, thunkApi) => {
  console.log(params)
  try {
    const payload = await edit(params)
    toast.success('Actualizado con éxito')
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
    toast.success('Eliminado con éxito')
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
