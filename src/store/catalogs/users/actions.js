import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {
  createUserService,
  deleteUserService,
  editUserService,
  getUsersService
} from 'src/services/catalogs/users'
import {openSnackBar} from 'src/store/notifications'

export const getUsers = createAsyncThunk('/users/getusers', async thunkApi => {
  try {
    const payload = await getUsersService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createUser = createAsyncThunk('/users', async (body, thunkApi) => {
  try {
    const payload = await createUserService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'User creada con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editUser = createAsyncThunk('/users/editUser', async (body, thunkApi) => {
  try {
    const payload = await editUserService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Usuario actualizada con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteUser = createAsyncThunk('/users/getUsers', async ({id}, thunkApi) => {
  try {
    const payload = await deleteUserService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Usuario eliminada con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: 'errMessage', severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})