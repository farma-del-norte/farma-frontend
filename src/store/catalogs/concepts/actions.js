import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import * as ConceptsApi from 'src/services/catalogs/concepts'
import {openSnackBar} from 'src/store/notifications'
import {CATALOGS_LOCALE} from 'src/utils/constants'

export const getConcepts = createAsyncThunk('/concepts/getConcepts', async thunkApi => {
  try {
    const payload = await ConceptsApi.getConceptsService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createConcept = createAsyncThunk('/concepts/createConcept', async (body, thunkApi) => {
  try {
    const payload = await ConceptsApi.createConceptService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.CONCEPTS_CREATE_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editConcept = createAsyncThunk('/concepts/editConcept', async (body, thunkApi) => {
  try {
    const payload = await ConceptsApi.editConceptService(body)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.CONCEPTS_EDIT_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteConcept = createAsyncThunk('/concepts/deleteConcepts', async ({id}, thunkApi) => {
  try {
    const payload = await ConceptsApi.deleteConceptService(id)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.CONCEPTS_DELETE_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
