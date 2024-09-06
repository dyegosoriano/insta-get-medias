export const getShortCode = url => {
  const POST_REGEX = /https:\/\/www\.instagram\.com\/(p|tv|reel|reels)\/([A-Za-z0-9_-]*)(\/?)/
  const page = url.match(POST_REGEX)

  if (page) return page[2]
}

export const getUsername = url => {
  const regex_username = /^https:\/\/www\.instagram\.com\/([^\/]+)\/?$/
  const match: any = url.match(regex_username)

  if (!!match) return match[1]
  return url
}

export const getMediaName = url => {
  const regex_post = /https:\/\/www\.instagram\.com\/p\/(.*)\/?/
  const [_, media_name]: any = url.match(regex_post)

  return media_name.replaceAll('/', '')
}
