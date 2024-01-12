const Koa = require('koa')
const next = require('next')
const { parse } = require('url')

async function serve() {
  const dev = process.env.NODE_ENV !== 'production'
  const app = next({ dev })
  await app.prepare()
  const handle = app.getRequestHandler()

  const server = new Koa()

  server.use(async (ctx, next) => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
    await next()
  })

  const port = 3000
  server.listen(port, () => {
    console.log(`--------------------------- Koa server listening on: ${port}. Press CTRL+C to shut down.`)
  })
}

serve()
