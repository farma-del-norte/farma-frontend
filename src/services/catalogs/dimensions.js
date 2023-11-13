import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {DIMENSIONS_CAT_ENDPOINT} from '../endpoints'

export const getDimensionsCatService = async () => {
  const url = `${DIMENSIONS_CAT_ENDPOINT}/dimensions-cat`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createDimensionCatService = async body => {
  const url = `${DIMENSIONS_CAT_ENDPOINT}/dimensions-cat`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editDimensionCatService = async body => {
  const url = `${DIMENSIONS_CAT_ENDPOINT}/dimensions/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteDimensionCatService = async id => {
  const url = `${DIMENSIONS_CAT_ENDPOINT}/dimensions/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
