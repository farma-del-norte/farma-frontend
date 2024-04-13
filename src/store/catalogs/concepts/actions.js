import {createAsyncThunk} from '@reduxjs/toolkit'
import * as ConceptsCatpi from 'src/services/catalogs/concepts'
import toast from 'react-hot-toast'
import {t} from 'i18next'

export const getConceptsCat = createAsyncThunk('/concepts-cat/getConceptsCat', async thunkApi => {
  try {
    const payload = await ConceptsCatpi.getConceptCatsService()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createConceptCat = createAsyncThunk('/concepts-cat/createConceptCat', async (body, thunkApi) => {
  try {
    const payload = await ConceptsCatpi.createConceptCatService(body)
    toast.success(t('concepts_cat_create_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editConceptCat = createAsyncThunk('/concepts-cat/editConceptCat', async (body, thunkApi) => {
  try {
    const payload = await ConceptsCatpi.editConceptCatService(body)
    toast.success(t('concepts_cat_edit_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteConceptCat = createAsyncThunk('/concepts-cat/deleteConceptCats', async ({id}, thunkApi) => {
  try {
    const payload = await ConceptsCatpi.deleteConceptCatService(id)
    toast.success(t('concepts_cat_delete_message', {ns: 'catalogs'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
