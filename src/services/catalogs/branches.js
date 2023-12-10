import {api_delete, api_get, api_patch, api_post} from '../apicalls'
import axiosInstance from '../axiosInstance'
import {BRANCHES_ENDPOINT} from '../endpoints'

export const getBranchesData = async () => {
  const url = `${BRANCHES_ENDPOINT}/branches`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const postBranchesData = async body => {
  const url = `${BRANCHES_ENDPOINT}/branches`
  try {
    const result = api_post(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const patchBranchData = async body => {
  const url = `${BRANCHES_ENDPOINT}/branches/${body.id}`
  try {
    const result = api_patch(url, body)
    return result
  } catch (error) {
    console.error('Error updating data:', error)
    throw error
  }
}

export const deleteBranchData = async id => {
  const url = `${BRANCHES_ENDPOINT}/branches/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch (error) {
    throw error
  }
}
