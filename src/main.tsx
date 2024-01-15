const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const session = require('koa-session')
const Redis = require('ioredis')

const RedisSessionStore = require('./server/session-store.tsx')

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

  router.get('/api/test', async (ctx) => {
    ctx.body = {
      code: 200,
      data: 'hello world'
    }
  })

  router.get('/set/user', async (ctx) => {
    ctx.session.user = {
      name: 'wang',
      age: 23,
    }
    ctx.body = 'set session success'
  })

  router.get('/get/user', async (ctx) => {
    ctx.session.user = {
      name: 'wang',
      age: 23,
    }
    ctx.body = 'set session success'
  })

  router.get('/delete/user', async (ctx) => {
    ctx.session = null
    ctx.body = 'delete session success'
  })

  server.use(router.routes())


  server.use(async (ctx, next) => {
    // ctx.cookies.set('id', index)
    // index += 1
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    await next()
  })

  server.use(async (ctx, next) => {
    //console.log(ctx.cookies.get('id'))
    await next()
  })

  server.listen(3000, () => {
    console.log('--------------------------- koa server listening on 3000 now ----------------------------');
  })
})
