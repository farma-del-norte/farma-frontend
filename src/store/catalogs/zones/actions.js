import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {createZoneService, deleteZoneService, editZoneService, getZonesService} from 'src/services/catalogs/zones'
import {openSnackBar} from 'src/store/notifications'

export const getZones = createAsyncThunk('/zones/getZones', async thunkApi => {
  try {
    const payload = await getZonesService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createZone = createAsyncThunk('/zones/createZone', async (body, thunkApi) => {
  try {
    const payload = await createZoneService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Zona creada con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editZone = createAsyncThunk('/zones/editZone', async (body, thunkApi) => {
  try {
    const payload = await editZoneService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Zona actualizada con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteZone = createAsyncThunk('/zones/getZones', async ({id}, thunkApi) => {
  try {
    const payload = await deleteZoneService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Zona eliminada con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
