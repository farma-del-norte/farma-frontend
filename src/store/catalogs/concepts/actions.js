import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import {
  createConceptService,
  deleteConceptService,
  editConceptService,
  getConceptsService
} from 'src/services/catalogs/concepts'
import {openSnackBar} from 'src/store/notifications'
import {concepts_locale} from 'src/utils/locales/catalogs/localization'

export const getConcepts = createAsyncThunk('/concepts/getConcepts', async thunkApi => {
  try {
    const payload = await getConceptsService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createConcept = createAsyncThunk('/concepts/createConcept', async (body, thunkApi) => {
  try {
    const payload = await createConceptService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: concepts_locale.create_success, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editConcept = createAsyncThunk('/concepts/editConcept', async (body, thunkApi) => {
  try {
    const payload = await editConceptService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: concepts_locale.edit_success, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteConcept = createAsyncThunk('/concepts/getConcepts', async ({id}, thunkApi) => {
  try {
    const payload = await deleteConceptService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: concepts_locale.delete_success, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
