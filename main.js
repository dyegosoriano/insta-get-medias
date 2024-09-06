import { createBodyMedia, getAuthOptions } from './utils.js'
import { getPostPhotos } from './post-utils.js'
import { getShortCode } from './getters.js'

export const downloadPostPhotos = async () => {
  const postUrl = window.location.href
  const data = {
    user: { username: '', fullName: '' },
    media: [],
    date: ''
  }

  const options = getAuthOptions({ postUrl })
  const shortCode = getShortCode(postUrl) || ''

  const json = await getPostPhotos(shortCode, options)
  if (!json) return null

  data.user.username = json.user['username']
  data.user.fullName = json.user['full_name']
  data.date = json['taken_at']

  if (json['carousel_media']) {
    json['carousel_media'].forEach(item => data.media.push(createBodyMedia(item)))
  } else {
    data.media.push(createBodyMedia(json))
  }

  return data
}
