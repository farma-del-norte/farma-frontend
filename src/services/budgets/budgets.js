import {api_post, api_get, api_patch, api_delete} from '../apicalls'
import {BUDGETS_ENDPOINT} from '../endpoints'

export const getBudgets = async () => {
  const url = `${BUDGETS_ENDPOINT}/budgets/`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const createBudget = async body => {
  const url = `${BUDGETS_ENDPOINT}/budgets/`
  try {
    const result = await api_post(url, body)
    return result
  } catch {
    throw error
  }
}

export const editBudget = async body => {
  const url = `${BUDGETS_ENDPOINT}/budgets/${body.id}`
  try {
    const result = await api_patch(url, body)
    return result
  } catch (error) {
    throw error
  }
}

export const deleteBudget = async id => {
  const url = `${BUDGETS_ENDPOINT}/budgets/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}