const axios = require('axios')

const github_base_url = 'https://api.github.com'

const isServer = typeof window === 'undefined'

async function requestGithub(method, url, data, headers) {
  console.log('-------------------- requestGithub ------------------------------')
  const new_url = `${github_base_url}${url}`
  console.log(new_url)

  return await axios({
    method,
    url: new_url,
    data,
    headers
  })
}

async function request({ method = 'GET', url, data = {} }, req, res) {
  if (!url) {
    throw new Error('url is required')
  }

  console.log('-------------------- lib request ------------------------------')
  console.log(url)

  if (isServer) {
    const headers = {}
    const githubAuth = req.session.githubAuth || {}
    if (githubAuth.access_token) {
      headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
    }
    return await requestGithub(method, url, data, headers)
  }
  else {
    const new_url = `/github${url}`
    console.log(new_url)
    return await axios({
      method,
      url: new_url,
      data
    })
  }
}

module.exports = {
  request,
  requestGithub
}