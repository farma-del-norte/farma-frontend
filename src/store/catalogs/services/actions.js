import {createAsyncThunk} from '@reduxjs/toolkit'
import {
  createServiceCatService,
  deleteServiceCatService,
  editServiceCatService,
  getServiceCatService
} from 'src/services/catalogs/services'
import toast from 'react-hot-toast'
import {t} from 'i18next'

export const getServicesCat = createAsyncThunk('/services-cat/getServicesCat', async thunkApi => {
  try {
    const payload = await getServiceCatService()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createServiceCat = createAsyncThunk('/services-cat/createServiceCat', async (body, thunkApi) => {
  try {
    const payload = await createServiceCatService(body)
    toast.success(t('services_cat_create_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editServiceCat = createAsyncThunk('/services-cat/editServiceCat', async (body, thunkApi) => {
  try {
    const payload = await editServiceCatService(body)
    toast.success(t('services_cat_edit_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteServiceCat = createAsyncThunk('/services-cat/deleteServiceCat', async ({id}, thunkApi) => {
  try {
    const payload = await deleteServiceCatService(id)
    toast.success(t('services_cat_delete_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
