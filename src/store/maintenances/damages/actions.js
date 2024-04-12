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
    thunkApi.dispatch(openSnackBar({open: true, message: 'Siniestro creado con éxito', severity: 'success'}))
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
    thunkApi.dispatch(openSnackBar({open: true, message: 'Siniestro actualizado con éxito', severity: 'success'}))
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
    thunkApi.dispatch(openSnackBar({open: true, message: 'Siniestro eliminado con éxito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
