import {createAsyncThunk} from '@reduxjs/toolkit'
import {
  createDamageService,
  deleteDamageService,
  editDamageService,
  getDamagesService
} from 'src/services/maintenances/damages'
import toast from 'react-hot-toast'

export const getDamages = createAsyncThunk('/damages/getDamages', async thunkApi => {
  try {
    const payload = await getDamagesService()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createDamage = createAsyncThunk('/damages/createDamage', async (body, thunkApi) => {
  try {
    const payload = await createDamageService(body)
    toast.success('Siniestro creado con éxito')
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editDamage = createAsyncThunk('/damages/editDamage', async (body, thunkApi) => {
  try {
    const payload = await editDamageService(body)
    toast.success('Siniestro actualizado con éxito')
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteDamage = createAsyncThunk('/damages/deleteDamage', async ({id}, thunkApi) => {
  try {
    const payload = await deleteDamageService(id)
    toast.success('Siniestro eliminado con éxito')
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
