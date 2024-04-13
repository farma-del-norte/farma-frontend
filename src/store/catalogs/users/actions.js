import {createAsyncThunk} from '@reduxjs/toolkit'
import {createUserService, deleteUserService, editUserService, getUsersService} from 'src/services/catalogs/users'
import toast from 'react-hot-toast'

export const getUsers = createAsyncThunk('/users/getusers', async thunkApi => {
  try {
    const payload = await getUsersService()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const getUsersLogin = createAsyncThunk('/user/login', async (body, thunkApi) => {
  try {
    const payload = await usersLogin(body)
    return payload
  } catch (error) {
    const errMessage = error.response.data.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createUser = createAsyncThunk('/users', async (body, thunkApi) => {
  try {
    const payload = await createUserService(body)
    toast.success('Usuario creado con éxito')
    return payload
  } catch (error) {
    const errMessage = error.response.data.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editUser = createAsyncThunk('/users/editUser', async (body, thunkApi) => {
  try {
    const payload = await editUserService(body)
    toast.success('Usuario actualizado con éxito')
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteUser = createAsyncThunk('/users/deleteUsers', async ({id}, thunkApi) => {
  try {
    const payload = await deleteUserService(id)
    toast.success('Usuario eliminado con éxito')
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
