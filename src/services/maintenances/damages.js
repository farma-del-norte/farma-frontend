import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {DAMAGES_ENDPOINT} from '../endpoints'

export const getDamagesService = async () => {
  const url = `${DAMAGES_ENDPOINT}/damages`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createDamageService = async body => {
  const url = `${DAMAGES_ENDPOINT}/damages`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editDamageService = async body => {
  const url = `${DAMAGES_ENDPOINT}/damages/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteDamageService = async id => {
  const url = `${DAMAGES_ENDPOINT}/damages/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch (error) {
    throw error
  }
}
