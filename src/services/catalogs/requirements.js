import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {REQUIREMENTS_ENDPOINT} from '../endpoints'

export const getRequirementsService = async () => {
  const url = `${REQUIREMENTS_ENDPOINT}/requirements`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createRequirementService = async body => {
  const url = `${REQUIREMENTS_ENDPOINT}/requirements`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editRequirementService = async body => {
  const url = `${REQUIREMENTS_ENDPOINT}/requirements/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteRequirementService = async id => {
  const url = `${REQUIREMENTS_ENDPOINT}/requirements/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
