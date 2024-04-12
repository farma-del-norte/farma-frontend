import {createAsyncThunk} from '@reduxjs/toolkit'
import {t} from 'i18next'
import * as VariablesCatAPI from 'src/services/catalogs/variables'
import toast from 'react-hot-toast'

export const getVariablesCat = createAsyncThunk('/variables-cat/getVariablesCat', async thunkApi => {
  try {
    const payload = await VariablesCatAPI.getVariablesCatService()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createVariableCat = createAsyncThunk('/variables-cat/createVariableCat', async (body, thunkApi) => {
  try {
    const payload = await VariablesCatAPI.createVariableCatService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('variables_cat_create_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editVariableCat = createAsyncThunk('/variables-cat/editVariableCat', async (body, thunkApi) => {
  try {
    const payload = await VariablesCatAPI.editVariableCatService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('variables_cat_edit_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteVariableCat = createAsyncThunk('/variables-cat/deleteVariablesCat', async ({id}, thunkApi) => {
  try {
    const payload = await VariablesCatAPI.deleteVariableCatService(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('variables_cat_delete_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
