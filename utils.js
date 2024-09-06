export const getAuthOptions = input => {
  const csrftoken = document.cookie.split(' ')[2].split('=')[1]
  const claim = sessionStorage.getItem('www-claim-v2')

  const options = {
    headers: {
      // Hardcode variable: a="129477";f.ASBD_ID=a in JS, can be remove
      // 'x-instagram-ajax': '1006598911',
      // 'x-asbd-id': '129477',
      'x-requested-with': 'XMLHttpRequest',
      'x-ig-app-id': '1217981644879628', // 'x-ig-app-id': APP_ID,
      'x-csrftoken': csrftoken,
      'x-ig-www-claim': claim
    },
    referrerPolicy: 'strict-origin-when-cross-origin',
    credentials: 'include',
    referrer: input?.postUrl,
    method: 'GET',
    mode: 'cors'
  }

  return options
}

export const convertToPostId = shortCode => {
  const instagramAlphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'
  let id = BigInt(0)

  for (let i = 0; i < shortCode.length; i++) {
    let char = shortCode[i]
    id = id * BigInt(64) + BigInt(instagramAlphabet.indexOf(char))
  }

  return id.toString(10)
}

export const createBodyMedia = item => {
  const isVideo = item['media_type'] !== 1

  return {
    url: isVideo ? item['image_versions2'].candidates[0]['url'] : item['video_versions'][0].url,
    id: item.id.split('_')[0],
    isVideo
  }
}
