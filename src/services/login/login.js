import {api_post, api_patch, api_get} from '../apicalls'
import {USERS_ENDPOINT} from '../endpoints'

export const usersLogin = async body => {
  const url = `${USERS_ENDPOINT}/users/login`
  try {
    const result = await api_post(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const usersLoadSession = async () => {
  const url = `${USERS_ENDPOINT}/users/data-user`

  try {
    const response = await api_get(url)
    return response.content
  } catch (error) {
    const errMessage = error?.response?.data?.message
    toast.error(errMessage)
    return thunkApi.rejectWithValue('error')
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
