import {createAsyncThunk} from '@reduxjs/toolkit'
import {
  createDamageCatService,
  deleteDamageCatService,
  editDamageCatService,
  getDamagesCatService
} from 'src/services/catalogs/damages'
import toast from 'react-hot-toast'

export const getDamagesCat = createAsyncThunk('/damages-cat/getDamagesCat', async thunkApi => {
  try {
    const payload = await getDamagesCatService()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createDamageCat = createAsyncThunk('/damages-cat/createDamageCat', async (body, thunkApi) => {
  try {
    const payload = await createDamageCatService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Siniestro creado con éxito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editDamageCat = createAsyncThunk('/damages-cat/editDamageCat', async (body, thunkApi) => {
  try {
    const payload = await editDamageCatService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Siniestro actualizado con éxito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteDamageCat = createAsyncThunk('/damages-cat/deleteDamagesCat', async ({id}, thunkApi) => {
  try {
    const payload = await deleteDamageCatService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Siniestro eliminado con éxito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
