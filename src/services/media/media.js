import {api_post, api_get, api_patch, api_put, api_delete} from '../apicalls'
import {MEDIA_ENDPOINT, S3_ENDPOINT} from '../endpoints'

//TODO: Change to real endpoint url

export const getMedia = async () => {
  const url = `${MEDIA_ENDPOINT}/media`
  try {
    const result = await api_get(url)
    return result
  } catch (error) {
    throw error
  }
}

export const getMediaById = async (id) => {
    const url = `${MEDIA_ENDPOINT}/media/owner/${id}`
    try {
      const result = await api_get(url)
      return result
    } catch (error) {
      throw error
    }
  }

export const createMedia = async body => {
  const url = `${MEDIA_ENDPOINT}/media`
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJwcm9qZWN0TmFtZSI6IkZhcm1hIGRlbCBOb3J0ZSIsInByb2plY3RJZCI6IjEifQ.Lw9Iwt9omeeuNYm2KFDhtg7U9rzEjtayKFuW_kIf-C0'
  const auth = `Bearer ${token}`
  const typeFileMedia = { image: 'Imagen', video: 'video', application: 'Pdf'}
  const urlMedias = []
  const medias = body
  try {
    for(const media of medias.evidence){
        const extFile = media.file.split(';')[0].split('/')[1]
        const fileType = media.file.split(':')[1].split('/')[0]
        const presignedUrlHeaders = { headers: { Authorization: auth, fileType: extFile } }

        const bodyForPresignedUrl = {
          bucketName: 'media-farma-dev',
          key: `${medias.bucketName}/${medias.partKey}/${media.name}`
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
          const headers = { headers: { 'Content-Type': `${fileType}/${extFile}`, 'Content-Encoding': 'base64'} }

          // saved on aws s3
          await api_put(presignedUrl, buffer, headers)
          const mediaUrl = presignedUrl.split('?')[0];
          urlMedias.push(mediaUrl);

          body = {
            url: mediaUrl,
            type: typeFileMedia[fileType],
            ownerId: medias.partKey,
            typeOwner: medias.bucketName
          }

          // saved on media endpoint
          await api_post(url, body)
        }
    }
    return urlMedias
  } catch (error) {
    throw error
  }
}

export const editMedia = async body => {
  const news = body.evidence.filter((media) => !media.url && media.file)
  const existed = body.evidence.filter((media) => media.url)
  try {
    const mediasExisted = await getMediaById(body.partKey)
    if(mediasExisted.content.length > 0){
      const toRemove = mediasExisted.content.filter((obj1) => !existed.some(obj2 => obj1.id === obj2.id))
      for(var i = 0; i < toRemove.length; i++){
        await deleteMedia(toRemove[i].id)
      }
    }
    if(news.length > 0){
      body.evidence = news
      await createMedia(body)
    }
    const medias = await getMediaById(body.partKey)
    return medias
  } catch (error) {
    throw error
  }
}

export const deleteMedia = async id => {
  const url = `${MEDIA_ENDPOINT}/media/${id}`
  try {
    const result = await api_delete(url)
    return result
  } catch {
    throw error
  }
}