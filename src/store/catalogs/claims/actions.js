import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {createClaimService, deleteClaimService, editClaimService, getClaimsService} from 'src/services/catalogs/claims'
import {openSnackBar} from 'src/store/notifications'

export const getClaims = createAsyncThunk('/claims/getClaims', async thunkApi => {
  try {
    const payload = await getClaimsService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createClaim = createAsyncThunk('/claims/createClaim', async (body, thunkApi) => {
  try {
    const payload = await createClaimService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Siniestro creado con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editClaim = createAsyncThunk('/claims/editClaim', async (body, thunkApi) => {
  try {
    const payload = await editClaimService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Siniestro actualizado con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteClaim = createAsyncThunk('/claims/getClaims', async ({id}, thunkApi) => {
  try {
    const payload = await deleteClaimService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Siniestro eliminado con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
