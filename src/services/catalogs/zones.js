import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {ZONES_ENDPOINT} from '../endpoints'

export const getZonesService = async () => {
  const url = `${ZONES_ENDPOINT}/zones`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createZoneService = async body => {
  const url = `${ZONES_ENDPOINT}/zones`
  try {
    const result = await api_post(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const editZoneService = async body => {
  const url = `${ZONES_ENDPOINT}/zones/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteZoneService = async id => {
  const url = `${ZONES_ENDPOINT}/zones/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
