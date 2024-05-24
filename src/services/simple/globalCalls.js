import {api_post, api_get, api_patch, api_delete} from '../apicalls'

export const get = async (params) => {
  let url = `${params.endpoint}`
  url = url.replace(':id', params.id);
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const create = async (params) => {
  let url = `${params.endpointsParams.endpoint}`;
  try {
    // casos donde obtiene por id
    if (url.includes(':id')){
      url = url.substring(0, url.indexOf("/"));
      const created = await api_post(url, params)
      const result = await api_get(url)
      return {result, created}
    } else {
      const result = await api_post(url, params)
      return result
    }
  } catch {
    throw error
  }
}

export const edit = async (params) => {
  const url = `${params.endpointsParams.endpoint}/${params.id}`
  try {
    const result = await api_patch(url, params)
    return result
  } catch (error) {
    throw error
  }
}

export const del = async (params) => {
  const url = `${params.endpointsParams.endpoint}/${params.id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}