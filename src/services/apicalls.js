import axiosInstance from './axiosInstance';
import * as endpoints from './endpoints'

export const getBranchesData = async () => {
  try {
    const response = await axiosInstance.get(`${endpoints.BRANCHES}/branches`);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const postBranchesData = async (values) => {
  try {
    const response = await axiosInstance.post(`${endpoints.BRANCHES}/branches`, values);
    return response.data.content;
  } catch (error) {
    console.error('Error sending data:', error);
    throw error;
  }
};

export const patchBranchData = async (id, values) => {
  try {
    const response = await axiosInstance.patch(`${endpoints.BRANCHES}/branches/${id}`, values);
    return response.data.content;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const deleteBranchData = async (id) => {
  try {
    const response = await axiosInstance.delete(`${endpoints.BRANCHES}/branches/${id}`);
    return response.data.content;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};


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
