import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import * as VariablesCatAPI from 'src/services/catalogs/variables'
import {openSnackBar} from 'src/store/notifications'
import {CATALOGS_LOCALE} from 'src/utils/constants'

export const getVariablesCat = createAsyncThunk('/variables-cat/getVariablesCat', async thunkApi => {
  try {
    const payload = await VariablesCatAPI.getVariablesCatService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createVariableCat = createAsyncThunk('/variables-cat/createVariableCat', async (body, thunkApi) => {
  try {
    const payload = await VariablesCatAPI.createVariableCatService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.VARIABLES_CREATE_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editVariableCat = createAsyncThunk('/variables-cat/editVariableCat', async (body, thunkApi) => {
  try {
    const payload = await VariablesCatAPI.editVariableCatService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.VARIABLES_EDIT_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteVariableCat = createAsyncThunk('/variables-cat/deleteVariablesCat', async ({id}, thunkApi) => {
  try {
    const payload = await VariablesCatAPI.deleteVariableCatService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.VARIABLES_DELETE_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
