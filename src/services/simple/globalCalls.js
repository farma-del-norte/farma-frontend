import {api_post, api_get, api_patch, api_delete} from '../apicalls'

export const get = async (params) => {
  const url = `${params.endpoint}`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const create = async body => {
  const url = `${MAINTENANCES_ENDPOINT}`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const edit = async body => {
  const url = `${MAINTENANCES_ENDPOINT}/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const del = async (params) => {
  const url = `${params.endpointsParams.endpoint}/${params.id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}