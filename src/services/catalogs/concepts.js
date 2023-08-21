import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {CONCEPTS_ENDPOINT} from '../endpoints'

export const getConceptsService = async () => {
  const url = `${CONCEPTS_ENDPOINT}/concepts`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createConceptService = async body => {
  const url = `${CONCEPTS_ENDPOINT}/concepts`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editConceptService = async body => {
  const url = `${CONCEPTS_ENDPOINT}/concepts/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteConceptService = async id => {
  const url = `${CONCEPTS_ENDPOINT}/concepts/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
