import {createAsyncThunk} from '@reduxjs/toolkit'
import {t} from 'i18next'
import * as MaterialsAPI from 'src/services/catalogs/materials'
import toast from 'react-hot-toast'

export const getMaterialsCat = createAsyncThunk('/materials-cat/getMaterialsCat', async thunkApi => {
  try {
    const payload = await MaterialsAPI.getMaterialsCatService()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createMaterialCat = createAsyncThunk('/materials-cat/createMaterialCat', async (body, thunkApi) => {
  try {
    const payload = await MaterialsAPI.createMaterialCatService(body)
    toast.success(t('materials_cat_create_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editMaterialCat = createAsyncThunk('/materials-cat/editMaterialCat', async (body, thunkApi) => {
  try {
    const payload = await MaterialsAPI.editMaterialCatService(body)
    toast.success(t('materials_cat_edit_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteMaterialCat = createAsyncThunk('/materials-cat/deleteMaterialCat', async ({id}, thunkApi) => {
  try {
    const payload = await MaterialsAPI.deleteMaterialCatService(id)
    toast.success(t('materials_cat_delete_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
