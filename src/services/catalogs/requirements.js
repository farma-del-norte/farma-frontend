import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {REQUIREMENTS_CAT_ENDPOINT} from '../endpoints'

export const getRequirementCatsService = async () => {
  const url = `${REQUIREMENTS_CAT_ENDPOINT}/requirements-cat`
  try {
    const result = await api_get(url)
    console.log(result)
    return result
  } catch (error) {
    throw error
  }
}

export const createRequirementCatService = async body => {
  const url = `${REQUIREMENTS_CAT_ENDPOINT}/requirements-cat`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editRequirementCatService = async body => {
  const url = `${REQUIREMENTS_CAT_ENDPOINT}/requirements-cat/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteRequirementCatService = async id => {
  const url = `${REQUIREMENTS_CAT_ENDPOINT}/requirements-cat/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
