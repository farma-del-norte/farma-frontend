import {createAsyncThunk} from '@reduxjs/toolkit'
import {t} from 'i18next'
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
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('zones_create_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.response.data.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editZone = createAsyncThunk('/zones/editZone', async (body, thunkApi) => {
  try {
    const payload = await editZoneService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('zones_edit_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteZone = createAsyncThunk('/zones/deleteZones', async ({id}, thunkApi) => {
  try {
    const payload = await deleteZoneService(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('zones_delete_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
