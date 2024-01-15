const Koa = require('koa')
const next = require('next')
const session = require('koa-session')
const Redis = require('ioredis')

const RedisSessionStore = require('./server/session-store.tsx')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const redis = new Redis()

let index = 0

app.prepare().then(() => {
  const server = new Koa()
  const handle = app.getRequestHandler()

  server.keys = ['wang develop github app']

  const SESSION_CONFIG = {
    key: 'koa:sess',
    store: new RedisSessionStore()
  }

  server.use(session(SESSION_CONFIG, server))

  server.use(async (ctx, next) => {
    ctx.cookies.set('id', index)
    index += 1
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    await next()
  })

  server.use(async (ctx, next) => {
    console.log(ctx.cookies.get('id'))
    await next()
  })

  server.listen(3000, () => {
    console.log('--------------------------- koa server listening on 3000 now ----------------------------');
    //console.log('--------------------------- package. path----------------------------', package.path);
  })
})
