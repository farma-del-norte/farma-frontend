import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {SUPPLIERS_ENDPOINT} from '../endpoints'

export const getSuppliersService = async () => {
  const url = `${SUPPLIERS_ENDPOINT}/suppliers`
  try {
    const result = await api_get(url)
    console.log(result)
    return result
  } catch (error) {
    throw error
  }
}

export const createSuppliersService = async body => {
  const url = `${SUPPLIERS_ENDPOINT}/suppliers`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editSuppliersService = async body => {
  const url = `${SUPPLIERS_ENDPOINT}/suppliers/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteSuppliersService = async id => {
  const url = `${SUPPLIERS_ENDPOINT}/suppliers/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
