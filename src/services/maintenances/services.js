import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {SERVICES_ENDPOINT} from '../endpoints'

export const getService = async () => {
  const url = `${SERVICES_ENDPOINT}/services`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createService = async body => {
  const url = `${SERVICES_ENDPOINT}/services`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editService = async body => {
  const url = `${SERVICES_ENDPOINT}/services/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteService = async id => {
  const url = `${SERVICES_ENDPOINT}/services/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}