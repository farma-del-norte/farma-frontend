import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import store from 'src/store/index'

export const get = async () => {
  const state = store.simple.getState()
  console.log(state)
  const url = `${MAINTENANCES_ENDPOINT}/zones`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const create = async body => {
  const url = `${MAINTENANCES_ENDPOINT}/maintenances`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const edit = async body => {
  const url = `${MAINTENANCES_ENDPOINT}/maintenances/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const del = async id => {
  const url = `${MAINTENANCES_ENDPOINT}/maintenances/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}