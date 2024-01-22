import {createAsyncThunk} from '@reduxjs/toolkit'
import * as Branches from 'src/services/catalogs/branches'
import {openSnackBar} from 'src/store/notifications'
import CATALOGS_LOCALE from 'src/utils/locales/catalogs'

export const getBranches = createAsyncThunk('/branches/getBranches', async thunkApi => {
  try {
    const payload = await Branches.getBranchesData()
    return payload
  } catch (error) {
    return rejectError(error, thunkApi)
  }
})

export const createBranch = createAsyncThunk('/branches/createBranch', async (body, thunkApi) => {
  try {
    const payload = Branches.postBranchesData(body)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.BRANCHES_CREATE_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    return rejectError(error, thunkApi)
  }
})

export const editBranch = createAsyncThunk('/branches/editBranch', async (body, thunkApi) => {
  try {
    const payload = Branches.patchBranchData(body)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.BRANCHES_EDIT_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    return rejectError(error, thunkApi)
  }
})

export const deleteBranch = createAsyncThunk('/branches/deleteBranch', async ({id}, thunkApi) => {
  try {
    const payload = Branches.deleteBranchData(id)
    thunkApi.dispatch(openSnackBar({open: true, message: CATALOGS_LOCALE.BRANCHES_DELETE_MESSAGE, severity: 'success'}))
    return payload
  } catch (error) {
    return rejectError(error, thunkApi)
  }
})

const rejectError = (error, thunkApi) => {
  thunkApi.dispatch(openSnackBar({open: true, message: error, severity: 'error'}))
  return thunkApi.rejectWithValue('error')
}

// MARK: - Branch Details Form Actions
export const getBranchDetails = createAsyncThunk('/branches/getBranchDetails', async (branchDetailsId, thunkApi) => {
  try {
    const payload = Branches.getBranchDetailsData(branchDetailsId)
    return payload
  } catch (error) {
    thunkApi.dispatch(openSnackBar({open: true, message: error, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const addBranchDetails = createAsyncThunk('/branches/addBranchDetails', async ({branchId, body}, thunkApi) => {
  try {
    const payload = Branches.addBranchDetailsData(branchId, body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: CATALOGS_LOCALE.BRANCHES_BRANCH_ADD_DETAILS, severity: 'success'})
    )
    return payload
  } catch (error) {
    thunkApi.dispatch(openSnackBar({open: true, message: error, severity: 'error'}))
    return thunkApi.rejectWithValue('error')
  }
})

export const updateBranchDetails = createAsyncThunk(
  '/branches/updateBranchDetails',
  async ({branchDetailsId, body}, thunkApi) => {
    try {
      const payload = Branches.updateBranchDetailsData(branchDetailsId, body)
      thunkApi.dispatch(
        openSnackBar({open: true, message: CATALOGS_LOCALE.BRANCHES_BRANCH_EDIT_DETAILS, severity: 'success'})
      )
      return payload
    } catch (error) {
      thunkApi.dispatch(openSnackBar({open: true, message: error, severity: 'error'}))
      return thunkApi.rejectWithValue('error')
    }
  }
)
