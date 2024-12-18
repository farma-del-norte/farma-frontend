import {api_post, api_get, api_patch, api_delete, api_put} from '../apicalls'
import {MEDIA_ENDPOINT, S3_ENDPOINT} from '../endpoints'

const getIdKey = object => {
  const paramskeys = Object.keys(object)
  const keyWithId = paramskeys.find(key => key.endsWith('ID') || key.endsWith('id'))
  // !keyWithId &&
  //   console.error(
  //     '[Table-Manager] Asegurate de mandar la key "fieldName" con la key correcta del backend \n Ejemplo: "fieldName": "maintenanceID"'
  //   )
  return keyWithId
}

const getUrlUntilNthSlash = (url, n) => {
  let index = 0
  for (let i = 0; i < n; i++) {
    index = url.indexOf('/', index + 1)
  }
  return url.substring(0, index)
}

const setPagination = (endpoint, paginationModel) => {
  return `${endpoint}?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`
}

const createMedia = async body => {
  const url = `${MEDIA_ENDPOINT}/media`
  const token = process.env.S3_TOKEN
  const auth = `Bearer ${token}`
  const typeFileMedia = {image: 'Imagen', video: 'video', application: 'Pdf'}
  const medias = body
  try {
    for (const media of medias.files) {
      const extFile = media.file.split(';')[0].split('/')[1]
      const fileType = media.file.split(':')[1].split('/')[0]
      const presignedUrlHeaders = {headers: {Authorization: auth, fileType: extFile}}

      const bodyForPresignedUrl = {
        bucketName: process.env.NODE_ENV === 'production' ? 'media-farma-prod' : 'media-farma-dev',
        key: `${medias.belongsTo}/${medias.id}/${media.name}`
      }

      // get the s3 url to save
      const presignedUrlResponse = await api_post(
        `${S3_ENDPOINT}/files/createPresignedUrl`,
        bodyForPresignedUrl,
        presignedUrlHeaders
      )

      const presignedUrl = presignedUrlResponse?.details?.presignedUrl

      if (presignedUrl) {
        const buffer = Buffer.from(media.file.replace(/^data:(image|video|application)\/\w+;base64,/, ''), 'base64')
        const headers = {headers: {'Content-Type': `${fileType}/${extFile}`, 'Content-Encoding': 'base64'}}

        // saved on aws s3
        await api_put(presignedUrl, buffer, headers)
        const mediaUrl = presignedUrl.split('?')[0]

        body = {
          url: mediaUrl,
          type: typeFileMedia[fileType],
          ownerId: medias.id,
          typeOwner: medias.belongsTo
        }

        // saved on media endpoint
        await api_post(url, body)
      }
    }
  } catch (error) {
    throw error
  }
}

export const get = async params => {
  let url = `${params?.pagination ? setPagination(params.endpoint, params.paginationModel) : `${params.endpoint}`}`
  try {
    if (url.includes(':id')) {
      const paramKey = getIdKey(params)
      url = url.replace(':id', params[paramKey])
    }
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const create = async params => {
  let url = `${params.endpointsParams.endpoint}`
  try {
    // casos donde [guardar sera a esa id]
    if (url.includes(':id')) {
      url = getUrlUntilNthSlash(url, 4)
      const paramKey = getIdKey(params.endpointsParams)
      // se agrega el campo necesario id (no el que se genera al crear, seria a donde pertenece esta data en comun)
      params.form[paramKey] = params.endpointsParams[paramKey]
      let created = await api_post(url, params.form)
      // si un campo del form tiene media
      if (params.form[params.media.field] && params.media.saveMultimedia) {
        const mediaId = created.content[0].id
        const media = {
          id: mediaId,
          belongsTo: params.media.mediaOwner,
          files: params.form[params.media.field]
        }
        await createMedia(media)
        created = await get(params.endpointsParams)
      }
      return created
    } else {
      const result = await api_post(url, params.form)
      return result
    }
  } catch (error) {
    throw error
  }
}

export const edit = async params => {
  let url = `${params.endpointsParams.endpoint}`
  try {
    // casos donde [guardar sera a esa id]
    if (url.includes(':id')) {
      url = getUrlUntilNthSlash(url, 4)
    }
    const paramKey = getIdKey(params.endpointsParams)
    url = `${url}/${params.form.id || params.endpointsParams[paramKey]}`
    const result = await api_patch(url, params.form)
    return result
  } catch (error) {
    throw error
  }
}

export const del = async params => {
  let url = `${params.endpointsParams.endpoint}`
  try {
    if (url.includes(':id')) {
      url = getUrlUntilNthSlash(url, 4)
    }
    url = `${url}/${params.id}`
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}
