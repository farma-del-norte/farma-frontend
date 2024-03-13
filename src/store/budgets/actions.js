import {createAsyncThunk} from '@reduxjs/toolkit/dist'
import * as BudgetsApi from 'src/services/budgets/budgets'
import {openSnackBar} from 'src/store/notifications'
import { t } from 'i18next'

export const getBudgets = createAsyncThunk('/service/getBudgets', async thunkApi => {
  try {
    const payload = await BudgetsApi.getBudgets()
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const createBudget = createAsyncThunk('/service/createBudget', async (body, thunkApi) => {
  try {
    const payload = await BudgetsApi.createBudget(body)
    thunkApi.dispatch(openSnackBar({open: true, message: t('budgets_cat_create_message', {ns: 'budgets'}), severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const editBudget = createAsyncThunk('/service/editBudget', async (body, thunkApi) => {
  try {
    const payload = await BudgetsApi.editBudget(body)
    thunkApi.dispatch(openSnackBar({open: true, message: t('budgets_edit_message', {ns: 'budgets'}), severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const deleteBudget = createAsyncThunk('/service/deleteBudget', async ({id}, thunkApi) => {
  try {
    const payload = await BudgetsApi.deleteBudget(id)
    thunkApi.dispatch(openSnackBar({open: true, message: t('budgets_cat_delete_message', {ns: 'budgets'}), severity: 'success'}))
    return payload
  } catch (error) {
    const errMessage = error.message
    thunkApi.dispatch(openSnackBar({open: true, message: errMessage, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})