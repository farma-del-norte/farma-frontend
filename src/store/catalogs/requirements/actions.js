import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {
  createRequirementService,
  deleteRequirementService,
  editRequirementService,
  getRequirementsService
} from 'src/services/catalogs/requirements'
import {openSnackBar} from 'src/store/notifications'

export const getRequirements = createAsyncThunk('/requirements/getRequirements', async thunkApi => {
  try {
    const payload = await getRequirementsService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createRequirement = createAsyncThunk('/requirements/createRequirement', async (body, thunkApi) => {
  try {
    const payload = await createRequirementService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Requerimiento creado con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editRequirement = createAsyncThunk('/requirements/editRequirement', async (body, thunkApi) => {
  try {
    const payload = await editRequirementService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Requerimiento actualizado con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteRequirement = createAsyncThunk('/requirements/getRequirements', async ({id}, thunkApi) => {
  try {
    const payload = await deleteRequirementService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Requerimiento eliminado con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
