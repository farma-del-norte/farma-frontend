import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {MAINTENANCE_ENDPOINT} from '../endpoints'

export const getMaintenanceService = async () => {
  const url = `${MAINTENANCE_ENDPOINT}/maintenance/list`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createMaintenanceService = async body => {
  const url = `${MAINTENANCE_ENDPOINT}/maintenance`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editMaintenanceService = async body => {
  const url = `${MAINTENANCE_ENDPOINT}/maintenance/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteMaintenanceService = async id => {
  const url = `${MAINTENANCE_ENDPOINT}/maintenance/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
