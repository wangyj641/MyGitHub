const axios = require('axios')
const { requestGithub } = require('../lib/api.tsx')

const github_base_url = 'https://api.github.com'

module.exports = (server) => {
  server.use(async (ctx, next) => {
    const path = ctx.path
    if (path.startsWith('/github/')) {
      console.log('-------------------- server api------------------------------')
      console.log(path)
      console.log(ctx.request.body)

      const githubAuth = ctx.session.githubAuth || {}

      if (githubAuth) {
        const githubPath = ctx.url.replace('/github/', '/')
        console.log(githubPath)

        const headers = {}
        const token = githubAuth.access_token
        if (token) {
          headers['Authorization'] = `${githubAuth.token_type} ${token}`
        }

        const method = ctx.method
        const result = await requestGithub(
          method,
          githubPath,
          ctx.request.body || {},
          headers
        )
        ctx.status = result.status
        ctx.body = result.data
      }
    } else {
      await next()
    }
  }
  )
}
