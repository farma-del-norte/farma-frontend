import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {VARIABLES_ENDPOINT} from '../endpoints'

export const getVariablesService = async () => {
  const url = `${VARIABLES_ENDPOINT}/variables/list`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createVariableService = async body => {
  const url = `${VARIABLES_ENDPOINT}/variables`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editVariableService = async body => {
  const url = `${VARIABLES_ENDPOINT}/variables/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteVariableService = async id => {
  const url = `${VARIABLES_ENDPOINT}/variables/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
