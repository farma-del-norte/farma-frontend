import {createAsyncThunk} from '@reduxjs/toolkit'
import * as RequirementCatsAPI from 'src/services/catalogs/requirements'
import {openSnackBar} from 'src/store/notifications'
import CATALOGS_LOCALE from 'src/utils/locales/catalogs'

export const getRequirementsCat = createAsyncThunk('/requirements-cat/getRequirementsCat', async thunkApi => {
  try {
    const payload = await RequirementCatsAPI.getRequirementCatsService()
    console.log(payload)
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createRequirementCat = createAsyncThunk(
  '/requirements-cat/createRequirementCat',
  async (body, thunkApi) => {
    try {
      const payload = await RequirementCatsAPI.createRequirementCatService(body)
      thunkApi.dispatch(
        openSnackBar({open: true, message: CATALOGS_LOCALE.REQUIREMENTS_CREATE_MESSAGE, severity: 'success'})
      )
      return payload
    } catch (error) {
      const errMessage = error
      thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
      return thunkApi.rejectWithValue('error')
    }
  }
)

export const editRequirementCat = createAsyncThunk('/requirements-cat/editRequirementCat', async (body, thunkApi) => {
  try {
    const payload = await RequirementCatsAPI.editRequirementCatService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.REQUIREMENTS_EDIT_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteRequirementCat = createAsyncThunk(
  '/requirements-cat/deleteRequirementCats',
  async ({id}, thunkApi) => {
    try {
      const payload = await RequirementCatsAPI.deleteRequirementCatService(id)
      thunkApi.dispatch(
        openSnackBar({open: true, message: CATALOGS_LOCALE.REQUIREMENTS_DELETE_MESSAGE, severity: 'success'})
      )
      return payload
    } catch (error) {
      const errMessage = error.message
      thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
      return thunkApi.rejectWithValue('error')
    }
  }
)
