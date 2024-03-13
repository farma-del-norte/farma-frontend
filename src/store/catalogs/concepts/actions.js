import {createAsyncThunk} from '@reduxjs/toolkit'
import * as ConceptsCatpi from 'src/services/catalogs/concepts'
import {openSnackBar} from 'src/store/notifications'

export const getConceptsCat = createAsyncThunk('/concepts-cat/getConceptsCat', async thunkApi => {
  try {
    const payload = await ConceptsCatpi.getConceptCatsService()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createConceptCat = createAsyncThunk('/concepts-cat/createConceptCat', async (body, thunkApi) => {
  try {
    const payload = await ConceptsCatpi.createConceptCatService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('concepts_cat_create_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editConceptCat = createAsyncThunk('/concepts-cat/editConceptCat', async (body, thunkApi) => {
  try {
    const payload = await ConceptsCatpi.editConceptCatService(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('concepts_cat_edit_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteConceptCat = createAsyncThunk('/concepts-cat/deleteConceptCats', async ({id}, thunkApi) => {
  try {
    const payload = await ConceptsCatpi.deleteConceptCatService(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('concepts_cat_delete_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})
