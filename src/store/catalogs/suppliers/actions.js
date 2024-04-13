import {createAsyncThunk} from '@reduxjs/toolkit'
import {t} from 'i18next'
import * as SuppliersAPI from 'src/services/catalogs/suppliers'
import toast from 'react-hot-toast'

export const getSuppliers = createAsyncThunk('/suppliers/getSuppliers', async thunkApi => {
  try {
    const payload = await SuppliersAPI.getSuppliersService()
    console.log(payload)
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createSupplier = createAsyncThunk('/suppliers/createSupplier', async (body, thunkApi) => {
  try {
    const payload = await SuppliersAPI.createSuppliersService(body)
    toast.success(t('suppliers_create_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editSupplier = createAsyncThunk('/suppliers/editSupplier', async (body, thunkApi) => {
  try {
    const payload = await SuppliersAPI.editSuppliersService(body)
    toast.success(t('suppliers_edit_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteSupplier = createAsyncThunk('/suppliers/deleteSupplier', async ({id}, thunkApi) => {
  try {
    const payload = await SuppliersAPI.deleteSuppliersService(id)
    toast.success(t('suppliers_delete_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
