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
    toast.success('Siniestro creado con éxito')
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
    toast.success('Siniestro actualizado con éxito')

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
    toast.success('Siniestro eliminado con éxito')
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
