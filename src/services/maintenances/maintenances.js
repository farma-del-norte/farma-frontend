import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {MAINTENANCES_ENDPOINT} from '../endpoints'

export const getMaintenances = async () => {
  const url = `${MAINTENANCES_ENDPOINT}/maintenances`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createMaintenance = async body => {
  const url = `${MAINTENANCES_ENDPOINT}/maintenances`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editMaintenance = async body => {
  const url = `${MAINTENANCES_ENDPOINT}/maintenances/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteMaintenance = async id => {
  const url = `${MAINTENANCES_ENDPOINT}/maintenances/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}