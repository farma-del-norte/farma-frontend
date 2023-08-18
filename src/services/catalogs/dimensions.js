import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {DIMENSIONS_ENDPOINT} from '../endpoints'

export const getDimensionsService = async () => {
  const url = `${DIMENSIONS_ENDPOINT}/dimensions`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createDimensionService = async body => {
  const url = `${DIMENSIONS_ENDPOINT}/dimensions`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editDimensionService = async body => {
  const url = `${DIMENSIONS_ENDPOINT}/dimensions/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteDimensionService = async id => {
  const url = `${DIMENSIONS_ENDPOINT}/dimensions/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
