import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import * as VariablesAPI from 'src/services/catalogs/variables'
import {openSnackBar} from 'src/store/notifications'
import {CATALOGS_LOCALE} from 'src/utils/constants'

export const getVariables = createAsyncThunk('/variables/getVariables', async thunkApi => {
  try {
    const payload = await VariablesAPI.getVariablesService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createVariable = createAsyncThunk('/variables/createVariable', async (body, thunkApi) => {
  try {
    const payload = await VariablesAPI.createVariableService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.VARIABLES_CREATE_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editVariable = createAsyncThunk('/variables/editVariable', async (body, thunkApi) => {
  try {
    const payload = await VariablesAPI.editVariableService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.VARIABLES_EDIT_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteVariable = createAsyncThunk('/variables/deleteVariables', async ({id}, thunkApi) => {
  try {
    const payload = await VariablesAPI.deleteVariableService(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.VARIABLES_DELETE_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
