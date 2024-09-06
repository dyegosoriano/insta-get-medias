import { convertToPostId } from './utils'

const POST_HASH = '9f8827793ef34641b2fb195d4d41151c'
const BASE_URL = 'https://www.instagram.com/'

export const getPostIdFromAPI = async shortcode => {
  const apiURL = new URL('/graphql/query/', BASE_URL)
  apiURL.searchParams.set('query_hash', POST_HASH)
  apiURL.searchParams.set('variables', JSON.stringify({ shortcode }))

  try {
    const response = await fetch(apiURL.href)
    const json = await response.json()

    return json.data['shortcode_media'].id
  } catch (error) {
    console.log(error)
    return null
  }
}

export const getPostPhotos = async (shortcode, options) => {
  const postId = convertToPostId(shortcode)
  const apiURL = new URL(`/api/v1/media/${postId}/info/`, BASE_URL)

  try {
    let response = await fetch(apiURL.href, options)

    if (response.status === 400) {
      const postId = await getPostIdFromAPI(shortcode)
      if (!postId) throw new Error('Network bug')

      const apiURL = new URL(`/api/v1/media/${postId}/info/`, BASE_URL)

      response = await fetch(apiURL.href, options)
    }

    if (response.headers.get('content-type')?.includes('application/json')) {
      const json = await response.json()
      return json.items[0]
    } else {
      throw new Error('Resposta não é JSON')
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
