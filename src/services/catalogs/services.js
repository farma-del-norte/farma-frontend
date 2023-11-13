import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {SERVICES_CAT_ENDPOINT} from '../endpoints'

export const getServiceCatService = async () => {
  const url = `${SERVICES_CAT_ENDPOINT}/services-cat`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createServiceCatService = async body => {
  const url = `${SERVICES_CAT_ENDPOINT}/services-cat`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editServiceCatService = async body => {
  const url = `${SERVICES_CAT_ENDPOINT}/services-cat/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteServiceCatService = async id => {
  const url = `${SERVICES_CAT_ENDPOINT}/services-cat/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
