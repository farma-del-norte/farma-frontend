import axios from 'axios'

// Configuración de la instancia de Axios
const axiosInstance = axios.create({
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor de respuesta para manejar errores
axiosInstance.interceptors.response.use(
  response => response,
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

    // Descomenta esto si necesitas manejar un error 401
    // if (error.response.status === 401) {
    //   console.error('RESPONSE 401')
    //   localStorage.removeItem('persist:root')
    //   window.location.href = '/login'
    //   return Promise.reject(message)
    // }

    console.error('Axios Response Error: ', error.response, message)
    return Promise.reject(error)
  }
)

// Interceptor de solicitud para agregar headers
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('im-user')

    if (token && !config.url.includes('media-farma-dev.s3.us-east-1.amazonaws.com')) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default axiosInstance
