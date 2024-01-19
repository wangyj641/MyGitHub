const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const session = require('koa-session')
const Redis = require('ioredis')

const RedisSessionStore = require('./server/session-store.tsx')
const auth = require('./server/auth.tsx')
const api = require('./server/api.tsx')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const redis = new Redis()

let index = 0

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()
  const handle = app.getRequestHandler()

  server.keys = ['wang develop github app']

  const SESSION_CONFIG = {
    key: 'jid',
    store: new RedisSessionStore(redis)
  }

  server.use(session(SESSION_CONFIG, server))

  auth(server)
  api(server)

  // router.get('/api/user/info', async (ctx) => {
  //   const user = ctx.session.userInfo
  //   if (!user) {
  //     ctx.body = {
  //       code: 401,
  //       data: 'user is not login'
  //     }
  //   } else {
  //     ctx.body = {
  //       code: 200,
  //       data: user
  //     }
  //     ctx.set('Content-Type', 'application/json')
  //   }
  // })

  server.use(router.routes())

  server.use(async (ctx, next) => {
    ctx.req.session = ctx.session
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    await next()
  })

  server.listen(3000, () => {
    console.log('--------------------------- koa server listening on 3000 now ----------------------------');
  })
})
