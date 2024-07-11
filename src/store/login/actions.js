import {createAsyncThunk} from '@reduxjs/toolkit'
import {
  usersLogin,
  usersLoadSession,
  getVerificationCodeService,
  validateVerificationCodeService,
  updatePasswordService
} from 'src/services/login/login'
import toast from 'react-hot-toast'
import Router from 'next/router'

export const loginCall = createAsyncThunk('/user/login', async (body, thunkApi) => {
  try {
    const payload = await usersLogin(body)
    Router.push({pathname: '/dashboards'})
    return payload
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const loadSession = createAsyncThunk('/session/loadSession', async thunkApi => {
  try {
    const payload = await usersLoadSession()
    return payload
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const getVerificationCode = createAsyncThunk('/users/passwordRecoveryCode', async (body, thunkApi) => {
  try {
    let payload = await getVerificationCodeService(body)
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const validateVerificationCode = createAsyncThunk('/users/passwordRecoveryCode', async (body, thunkApi) => {
  try {
    const payload = await validateVerificationCodeService(body)
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const updatePassword = createAsyncThunk('/users/password', async (body, thunkApi) => {
  try {
    const payload = await updatePasswordService(body)
    toast.success('Contraseña cambiada con éxito')
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
