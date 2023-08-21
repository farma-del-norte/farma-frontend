import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import * as RequirementsAPI from 'src/services/catalogs/requirements'
import {openSnackBar} from 'src/store/notifications'
import {CATALOGS_LOCALE} from 'src/utils/constants'

export const getRequirements = createAsyncThunk('/requirements/getRequirements', async thunkApi => {
  try {
    const payload = await RequirementsAPI.getRequirementsService()
    console.log(payload)
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createRequirement = createAsyncThunk('/requirements/createRequirement', async (body, thunkApi) => {
  try {
    const payload = await RequirementsAPI.createRequirementService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.REQUIREMENTS_CREATE_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editRequirement = createAsyncThunk('/requirements/editRequirement', async (body, thunkApi) => {
  try {
    const payload = await RequirementsAPI.editRequirementService(body)
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

export const deleteRequirement = createAsyncThunk('/requirements/deleteRequirements', async ({id}, thunkApi) => {
  try {
    const payload = await RequirementsAPI.deleteRequirementService(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.REQUIREMENTS_DELETE_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
