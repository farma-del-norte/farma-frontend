import axiosInstance from '../axiosInstance'
import {BRANCHES_ENDPOINT} from '../endpoints'

export const getBranchesData = async () => {
  try {
    const response = await axiosInstance.get(`${BRANCHES_ENDPOINT}/branches`)
    return response.data.content
  } catch (error) {
    console.error('Error fetching data:', error)
    throw error
  }
}

export const postBranchesData = async values => {
  try {
    const response = await axiosInstance.post(`${BRANCHES_ENDPOINT}/branches`, values)
    return response.data.content
  } catch (error) {
    console.error('Error sending data:', error)
    throw error
  }
}

export const patchBranchData = async (id, values) => {
  try {
    const response = await axiosInstance.patch(`${BRANCHES_ENDPOINT}/branches/${id}`, values)
    return response.data.content
  } catch (error) {
    console.error('Error updating data:', error)
    throw error
  }
}

export const deleteBranchData = async id => {
  try {
    const response = await axiosInstance.delete(`${BRANCHES_ENDPOINT}/branches/${id}`)
    return response.data.content
  } catch (error) {
    console.error('Error deleting data:', error)
    throw error
  }
}
