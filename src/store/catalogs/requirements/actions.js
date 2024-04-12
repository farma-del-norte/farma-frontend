import {createAsyncThunk} from '@reduxjs/toolkit'
import * as RequirementCatsAPI from 'src/services/catalogs/requirements'
import toast from 'react-hot-toast'
import {t} from 'i18next'

export const getRequirementsCat = createAsyncThunk('/requirements-cat/getRequirementsCat', async thunkApi => {
  try {
    const payload = await RequirementCatsAPI.getRequirementCatsService()
    console.log(payload)
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createRequirementCat = createAsyncThunk(
  '/requirements-cat/createRequirementCat',
  async (body, thunkApi) => {
    try {
      const payload = await RequirementCatsAPI.createRequirementCatService(body)
      thunkApi.dispatch(
        openSnackBar({open: true, message: t('requirements_cat_create_message', {ns: 'catalogs'}), severity: 'success'})
      )
      return payload
    } catch (error) {
      const errMessage = error
      toast.error(errMessage)
      return thunkApi.rejectWithValue('error')
    }
  }
)

export const editRequirementCat = createAsyncThunk('/requirements-cat/editRequirementCat', async (body, thunkApi) => {
  try {
    const payload = await RequirementCatsAPI.editRequirementCatService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('requirements_cat_edit_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteRequirementCat = createAsyncThunk(
  '/requirements-cat/deleteRequirementCats',
  async ({id}, thunkApi) => {
    try {
      const payload = await RequirementCatsAPI.deleteRequirementCatService(id)
      thunkApi.dispatch(
        openSnackBar({open: true, message: t('requirements_cat_delete_message', {ns: 'catalogs'}), severity: 'success'})
      )
      return payload
    } catch (error) {
      const errMessage = error
      toast.error(errMessage)
      return thunkApi.rejectWithValue('error')
    }
  }
)
