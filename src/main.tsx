const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const session = require('koa-session')
const Redis = require('ioredis')
const { koaBody } = require('koa-body')

const RedisSessionStore = require('./server/session-store.tsx')
const auth = require('./server/auth.tsx')
const api = require('./server/api.tsx')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const redis = new Redis()

app.prepare().then(() => {
  const server = new Koa()
  const router = new Router()
  const handle = app.getRequestHandler()

  server.keys = ['wang develop github app']
  server.use(koaBody())

  const SESSION_CONFIG = {
    key: 'jid',
    store: new RedisSessionStore(redis)
  }

  server.use(session(SESSION_CONFIG, server))

  auth(server)
  api(server)

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
