import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {CLAIMS_ENDPOINT} from '../endpoints'

export const getClaimsService = async () => {
  const url = `${CLAIMS_ENDPOINT}/claims`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createClaimService = async body => {
  const url = `${CLAIMS_ENDPOINT}/claims`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editClaimService = async body => {
  const url = `${CLAIMS_ENDPOINT}/claims/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteClaimService = async id => {
  const url = `${CLAIMS_ENDPOINT}/claims/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch (error) {
    throw error
  }
}
