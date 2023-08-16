import axios from 'axios'

// const axiosInstance = axios.create({
//   baseURL: ''
// })

const axiosInstance = axios.create({
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});
export default axiosInstance;

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let message = ''
    if (error.response.status === 404) {
      message = 'Error al enviar la petición.'
    } else if (error.response.data?.message?.error) {
      const {data} = error.response
      message = data.message.error
    } else {
      message =
        'Existe un problema con el servicio, intente de nuevo mas tarde, si el problema persiste contacte a soporte.'
    }

    // if (error.response.status === 401) {
    //   console.error('RESPONSE 401')
    // localStorage.removeItem('persist:root')
    // window.location.href = '/login'
    //   return Promise.reject(message)
    // }

    console.error('Axios Response Error: ', error.response, message)
    return Promise.reject(error)
  }
)

export { axiosInstance }