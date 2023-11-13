import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {DAMAGES_CAT_ENDPOINT} from '../endpoints'

export const getDamagesCatService = async () => {
  const url = `${DAMAGES_CAT_ENDPOINT}/damages-cat`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createDamageCatService = async body => {
  const url = `${DAMAGES_CAT_ENDPOINT}/damages-cat`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editDamageCatService = async body => {
  const url = `${DAMAGES_CAT_ENDPOINT}/damages-cat/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteDamageCatService = async id => {
  const url = `${DAMAGES_CAT_ENDPOINT}/damages-cat/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch (error) {
    throw error
  }
}
