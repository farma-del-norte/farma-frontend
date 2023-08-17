import {DIMENSIONS_HOST, api_delete, api_get, api_patch, api_post} from '../api'

export const getDimensionsService = async () => {
  const url = `${DIMENSIONS_HOST}/dimensions`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    return error
  }
}

export const createDimensionService = async body => {
  const url = `${DIMENSIONS_HOST}/dimensions`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    return error
  }
}

export const editDimensionService = async body => {
  const url = `${DIMENSIONS_HOST}/dimensions/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch {
    return error
  }
}

export const deleteDimensionService = async id => {
  const url = `${DIMENSIONS_HOST}/dimensions/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    return error
  }
}
