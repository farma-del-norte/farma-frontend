import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {MATERIALS_ENDPOINT} from '../endpoints'

export const getMaterialsService = async () => {
  const url = `${MATERIALS_ENDPOINT}/materials`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const getUnitsService = async (id) => {
  const url = `${MATERIALS_ENDPOINT}/materials/service/${id}`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createMaterialService = async body => {
  const url = `${MATERIALS_ENDPOINT}/materials`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editMaterialService = async body => {
  const url = `${MATERIALS_ENDPOINT}/materials/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteMaterialService = async id => {
  const url = `${MATERIALS_ENDPOINT}/materials/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}