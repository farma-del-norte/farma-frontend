import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {USERS_ENDPOINT} from '../endpoints'

export const getUsersService = async () => {
  const url = `${USERS_ENDPOINT}/users`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const usersLogin = async body => {
  const url = `${USERS_ENDPOINT}/users/login`
  try {
    const result = await api_post(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const createUserService = async body => {
  const url = `${USERS_ENDPOINT}/users`
  try {
    const result = await api_post(url, body)
    console.log('Resultado:', result)
    return result
  } catch (error) {
    console.error('Error posting data:', error)
    throw error
  }
}

export const editUserService = async body => {
  const url = `${USERS_ENDPOINT}/users/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteUserService = async id => {
  const url = `${USERS_ENDPOINT}/users/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}

export const getVerificationCodeService = async body => {
  const url = `${USERS_ENDPOINT}/users/passwordRecoveryCode`
  try {
    const result = await api_post(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const validateVerificationCodeService = async body => {
  const url = `${USERS_ENDPOINT}/users/validatePasswordRecoveryCode`
  try {
    const result = await api_post(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const updatePasswordService = async body => {
  const url = `${USERS_ENDPOINT}/users/password`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}