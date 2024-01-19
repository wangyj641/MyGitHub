const axios = require('axios')

const github_base_url = 'https://api.github.com'

const isServer = typeof window === 'undefined'

async function requestGithub(method, url, data, headers) {
  console.log('-------------------- lib api------------------------------')
  console.log(url)

  return await axios({
    method,
    url: `${github_base_url}${url}`,
    data,
    headers
  })
}

async function request({ method = 'GET', url, data = {} }, req, res) {
  if (!url) {
    throw new Error('url is required')
  }

  if (isServer) {
    const headers = {}
    const githubAuth = req.session.githubAuth
    if (githubAuth.access_token) {
      headers['Authorization'] = `${githubAuth.token_type} ${githubAuth.access_token}`
    }
    return await requestGithub({ method, url, data, headers })
  }
  else {
    return await axios({
      method,
      url: `/github${url}`,
      data
    })
  }
}

module.exports = {
  request,
  requestGithub
}