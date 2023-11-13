import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {VARIABLES_CAT_ENDPOINT} from '../endpoints'

export const getVariablesCatService = async () => {
  const url = `${VARIABLES_CAT_ENDPOINT}/variables-cat`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createVariableCatService = async body => {
  const url = `${VARIABLES_CAT_ENDPOINT}/variables-cat`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editVariableCatService = async body => {
  const url = `${VARIABLES_CAT_ENDPOINT}/variables-cat/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteVariableCatService = async id => {
  const url = `${VARIABLES_CAT_ENDPOINT}/variables-cat/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
