import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {
  createMedia,
  deleteMedia,
  editMedia,
  getMedia,
  getMediaById
} from 'src/services/media/media'
import {openSnackBar} from 'src/store/notifications'

export const getMediaService = createAsyncThunk('/media/getMedia', async thunkApi => {
  try {
    const payload = await getMedia()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const getMediaByIdService = createAsyncThunk('/media/getMediabyId', async ({id}, thunkApi) => {
    try {
      const payload = await getMediaById(id)
      return payload
    } catch (error) {
      const errMessage = error
      thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
      return thunkApi.rejectWithValue('error')
    }
  })

export const createMediaService = createAsyncThunk('/media', async (body, thunkApi) => {
  try {
    const payload = await createMedia(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Multimedia guardado con éxito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message ?? error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editMediaService = createAsyncThunk('/media/editMedia', async (body, thunkApi) => {
  try {
    const payload = await editMedia(body)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Multimedia actualizado con éxito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteMediaService = createAsyncThunk('/media/deleteMedia', async ({id}, thunkApi) => {
  try {
    const payload = await deleteMedia(id)
    thunkApi.dispatch(openSnackBar({open: true, message: 'Multimedia eliminado con éxito', severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})