import {createAsyncThunk} from '@reduxjs/toolkit'
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
import toast from 'react-hot-toast'
import {t} from 'i18next'
//import Router from 'next/router'
import {setUser} from 'src/store/users/reducer'

export const getUsers = createAsyncThunk('/users/getusers', async thunkApi => {
  try {
    const payload = await getUsersService()
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const getUsersLogin = createAsyncThunk('/user/login', async (body, thunkApi) => {
  try {
    const payload = await usersLogin(body)
    console.log('repsonse', payload)
    thunkApi.dispatch(setUser(payload.content))
    console.log('repsonse1')
    //Router.push({pathname: '/dashboards'})
    console.log('repsonse2')
    return payload
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createUser = createAsyncThunk('/users', async (body, thunkApi) => {
  try {
    const payload = await createUserService(body)
    toast.success(t('success_user_created', {ns: 'users'}))
    return payload
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editUser = createAsyncThunk('/users/editUser', async (body, thunkApi) => {
  try {
    const payload = await editUserService(body)
    toast.success(t('success_user_edited', {ns: 'users'}))
    return payload
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteUser = createAsyncThunk('/users/deleteUsers', async ({id}, thunkApi) => {
  try {
    const payload = await deleteUserService(id)
    toast.success(t('success_user_deleted', {ns: 'users'}))
    return payload
  } catch (error) {
    const errMessage = error.message
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
    await toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const validateVerificationCode = createAsyncThunk('/users/passwordRecoveryCode', async (body, thunkApi) => {
  try {
    const payload = await validateVerificationCodeService(body)
    return payload
  } catch (error) {
    const errMessage = error.message
    await toast.error(errMessage)
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
    await toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
