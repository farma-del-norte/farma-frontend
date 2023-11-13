import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {MATERIALS_CAT_ENDPOINT} from '../endpoints'

export const getMaterialsCatService = async () => {
  const url = `${MATERIALS_CAT_ENDPOINT}/materials-cat`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createMaterialCatService = async body => {
  const url = `${MATERIALS_CAT_ENDPOINT}/materials-cat`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editMaterialCatService = async body => {
  const url = `${MATERIALS_CAT_ENDPOINT}/materials-cat/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteMaterialCatService = async id => {
  const url = `${MATERIALS_CAT_ENDPOINT}/materials-cat/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
