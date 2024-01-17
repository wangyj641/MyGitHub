const axios = require('axios')
const config = require('../../global.config.js')

const { client_id, client_secret, request_token_url } = config.github

module.exports = (server) => {
    server.use(async (ctx, next) => {
        if (ctx.path === '/auth') {
            console.log('------ auth ------')
            const code = ctx.query.code
            if (!code) {
                ctx.body = {
                    code: 400,
                    data: 'code is required'
                }
                return
            } else {
                console.log(code)
                const res = await axios({
                    method: 'post',
                    url: request_token_url,
                    data: {
                        client_id,
                        client_secret,
                        code
                    },
                    headers: {
                        'Accept': 'application/json'
                    }
                })

                console.log(res.status, res.data)

                if ((res.status === 200) && (res.data && !res.data.error)) {
                    console.log('------ get token success ------')
                    ctx.session.githubAuth = res.data
                    const { access_token, token_type } = res.data

                    const userInfoResp = await axios({
                        method: 'GET',
                        url: 'https://api.github.com/user',
                        headers: {
                            'Authorization': `${token_type} ${access_token}`,
                        },
                    })

                    console.log(userInfoResp.status, userInfoResp.data)
                    ctx.session.userInfo = userInfoResp.data
                    ctx.redirect('/')
                } else {
                    const errorMsg = res.data && res.data.error
                    ctx.body = {
                        code: 400,
                        data: `request token failed ${errorMsg}`
                    }
                }
                return
            }
        } else {
            await next()
        }
    })

    server.use(async (ctx, next) => {
        if (ctx.path === '/logout' && ctx.method === 'POST') {
            console.log('------ auth logout ------')
            ctx.session = null
            ctx.body = 'logout success'
        } else {
            await next()
        }
    })
}
