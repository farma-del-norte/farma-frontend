import axiosInstance from './axiosInstance';
import * as endpoints from './endpoints'

export const api_get = (url, headers = {}) => {
  return new Promise((res, rej) => {
    axiosInstance
      .get(url, headers)
      .then(({data}) => {
        res(data)
      })
      .catch(err => {
        return rej(err)
      })
  })
}

export const api_post = (url, body, headers = {}) => {
  return new Promise((res, rej) => {
    axiosInstance
      .post(url, body, headers)
      .then(({data}) => {
        res(data)
      })
      .catch(err => {
        return rej(err)
      })
  })
}

export const api_put = (url, body, headers = {}) => {
  return new Promise((res, rej) => {
    axiosInstance
      .put(url, body, headers)
      .then(({data}) => {
        res(data)
      })
      .catch(err => {
        return rej(err)
      })
  })
}

export const api_delete = (url, body, headers = {}) => {
  return new Promise((res, rej) => {
    axiosInstance
      .delete(url, {...headers, data: body})
      .then(({data}) => {
        res(data)
      })
      .catch(err => {
        return rej(err)
      })
  })
}
