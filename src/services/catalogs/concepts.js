import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {CONCEPTS_CAT_ENDPOINT} from '../endpoints'

export const getConceptCatsService = async () => {
  const url = `${CONCEPTS_CAT_ENDPOINT}/concepts-cat`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createConceptCatService = async body => {
  const url = `${CONCEPTS_CAT_ENDPOINT}/concepts-cat`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editConceptCatService = async body => {
  const url = `${CONCEPTS_CAT_ENDPOINT}/concepts-cat/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteConceptCatService = async id => {
  const url = `${CONCEPTS_CAT_ENDPOINT}/concepts-cat/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
