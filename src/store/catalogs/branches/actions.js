import {createAsyncThunk} from '@reduxjs/toolkit'
import {t} from 'i18next'
import * as Branches from 'src/services/catalogs/branches'
import toast from 'react-hot-toast'

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
    const payload = await Branches.postBranchesData(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('branches_create_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    return rejectError(error, thunkApi)
  }
})

export const editBranch = createAsyncThunk('/branches/editBranch', async (body, thunkApi) => {
  try {
    const payload = await Branches.patchBranchData(body)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('branches_edit_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    return rejectError(error, thunkApi)
  }
})

export const deleteBranch = createAsyncThunk('/branches/deleteBranch', async ({id}, thunkApi) => {
  try {
    const payload = await Branches.deleteBranchData(id)
    thunkApi.dispatch(
      openSnackBar({open: true, message: t('branches_delete_message', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    return rejectError(error, thunkApi)
  }
})

const rejectError = (error, thunkApi) => {
  toast.error(error)
  return thunkApi.rejectWithValue('error')
}

// MARK: - Branch Details Form Actions
export const getBranchDetails = createAsyncThunk('/branches/getBranchDetails', async (branchDetailsId, thunkApi) => {
  try {
    const payload = await Branches.getBranchDetailsData(branchDetailsId)
    return branchDetailsId ? payload : null
  } catch (error) {
    // toast.error(error)
    return thunkApi.rejectWithValue('error')
  }
})

export const addBranchDetails = createAsyncThunk('/branches/addBranchDetails', async ({branchId, body}, thunkApi) => {
  try {
    const payload = await Branches.addBranchDetailsData(branchId, body)

    thunkApi.dispatch(
      openSnackBar({open: true, message: t('brances_create_branch_details', {ns: 'catalogs'}), severity: 'success'})
    )
    return payload
  } catch (error) {
    toast.error(error)
    return thunkApi.rejectWithValue('error')
  }
})

export const updateBranchDetails = createAsyncThunk(
  '/branches/updateBranchDetails',
  async ({branchDetailsId, body}, thunkApi) => {
    try {
      const payload = await Branches.updateBranchDetailsData(branchDetailsId, body)
      thunkApi.dispatch(
        openSnackBar({open: true, message: t('brances_edit_branch_details', {ns: 'catalogs'}), severity: 'success'})
      )
      return payload
    } catch (error) {
      toast.error(error)
      return thunkApi.rejectWithValue('error')
    }
  }
)
