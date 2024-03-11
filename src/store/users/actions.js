import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {
  createUserService,
  deleteUserService,
  editUserService,
  getUsersService,
  usersLogin,
  getVerificationCodeService,
  validateVerificationCodeService,
  updatePasswordService
} from 'src/services/catalogs/users'
import {openSnackBar} from 'src/store/notifications'
import Router from 'next/router'
import USERS_LOCALE from 'src/utils/locales/users'

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

export const getUsersLogin = createAsyncThunk('/user/login', async (body, thunkApi) => {
  try {
    const payload = await usersLogin(body)
    Router.push('/dashboards')
    return payload
  } catch (error) {
    console.log(error.response.data.message)
    const errMessage = error.response.data.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createUser = createAsyncThunk('/users', async (body, thunkApi) => {
  try {
    const payload = await createUserService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: USERS_LOCALE.USER_CREATED, severity: 'success'}))
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
    thunkApi.dispatch(openSnackBar({open: true, message: USERS_LOCALE.USER_EDITED, severity: 'success'}))
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
    thunkApi.dispatch(openSnackBar({open: true, message: USERS_LOCALE.USER_DELETED, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: 'errMessage', severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const getVerificationCode = createAsyncThunk('/users/passwordRecoveryCode', async (body, thunkApi) => {
  try {
    const payload = await getVerificationCodeService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Codigo enviado con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const validateVerificationCode = createAsyncThunk('/users/passwordRecoveryCode', async (body, thunkApi) => {
  try {
    const payload = await validateVerificationCodeService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Codigo enviado con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const updatePassword = createAsyncThunk('/users/password', async (body, thunkApi) => {
  try {
    const payload = await updatePasswordService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Codigo enviado con exito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})