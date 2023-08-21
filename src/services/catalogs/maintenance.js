import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {MAINTENANCE_ENDPOINT} from '../endpoints'

export const getMaintenanceService = async () => {
  const url = `${MAINTENANCE_ENDPOINT}/maintenances`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createMaintenanceService = async body => {
  const url = `${MAINTENANCE_ENDPOINT}/maintenances`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editMaintenanceService = async body => {
  const url = `${MAINTENANCE_ENDPOINT}/maintenances/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteMaintenanceService = async id => {
  const url = `${MAINTENANCE_ENDPOINT}/maintenances/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
