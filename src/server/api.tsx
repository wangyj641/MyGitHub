const axios = require('axios')

const github_base_url = 'https://api.github.com'

module.exports = (server) => {
  server.use(async (ctx, next) => {
    const path = ctx.path
    if (path.startsWith('/github/')) {
      const githubAuth = ctx.session.githubAuth
      if (githubAuth) {
        const githubPath = `${github_base_url}${ctx.url.replace('/github/', '/')}`
        console.log(githubPath)

        const token = githubAuth.access_token
        const headers = {}
        if (token) {
          headers['Authorization'] = `${githubAuth.token_type} ${token}`
        }

        try {
          const result = await axios({
            method: 'GET',
            url: githubPath,
            headers: headers,
            data: ctx.request.body
          })

          if (result.status === 200) {
            ctx.body = result.data
            ctx.set('Content-Type', 'application/json')
          } else {
            ctx.status = result.status
            ctx.body = {
              success: false
            }
            ctx.set('Content-Type', 'application/json')
          }
        } catch (err) {
          console.error(err)
          ctx.body = {
            success: false
          }
          ctx.set('Content-Type', 'application/json')
        }
      } else {
        ctx.body = 'No github auth'
      }
    } else {
      await next()
    }
  })
}
