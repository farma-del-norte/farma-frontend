import {createAsyncThunk} from '@reduxjs/toolkit'
import * as SuppliersAPI from 'src/services/catalogs/suppliers'
import {openSnackBar} from 'src/store/notifications'
import CATALOGS_LOCALE from 'src/utils/locales/catalogs'

export const getSuppliers = createAsyncThunk('/suppliers/getSuppliers', async thunkApi => {
  try {
    const payload = await SuppliersAPI.getSuppliersService()
    console.log(payload)
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createSupplier = createAsyncThunk('/suppliers/createSupplier', async (body, thunkApi) => {
  try {
    const payload = await SuppliersAPI.createSuppliersService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.SUPPLIERS_CREATE_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editSupplier = createAsyncThunk('/suppliers/editSupplier', async (body, thunkApi) => {
  try {
    const payload = await SuppliersAPI.editSuppliersService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.SUPPLIERS_EDIT_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteSupplier = createAsyncThunk('/suppliers/deleteSupplier', async ({id}, thunkApi) => {
  try {
    const payload = await SuppliersAPI.deleteSuppliersService(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.SUPPLIERS_DELETE_MESSAGE, severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
