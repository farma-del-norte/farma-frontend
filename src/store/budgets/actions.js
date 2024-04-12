import {createAsyncThunk} from '@reduxjs/toolkit'
import * as BudgetsApi from 'src/services/budgets/budgets'
import toast from 'react-hot-toast'
import {t} from 'i18next'

export const getBudgets = createAsyncThunk('/service/getBudgets', async thunkApi => {
  try {
    const payload = await BudgetsApi.getBudgets()
    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const createBudget = createAsyncThunk('/service/createBudget', async (body, thunkApi) => {
  try {
    const payload = await BudgetsApi.createBudget(body)
    toast.success(t('budgets_cat_create_message', {ns: 'budgets'}))

    return payload
  } catch (error) {
    const errMessage = error
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const editBudget = createAsyncThunk('/service/editBudget', async (body, thunkApi) => {
  try {
    const payload = await BudgetsApi.editBudget(body)
    toast.success(t('budgets_edit_message', {ns: 'budgets'}))

    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteBudget = createAsyncThunk('/service/deleteBudget', async ({id}, thunkApi) => {
  try {
    const payload = await BudgetsApi.deleteBudget(id)
    toast.success(t('budgets_cat_delete_message', {ns: 'budgets'}))

    return payload
  } catch (error) {
    const errMessage = error.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
  }
})
