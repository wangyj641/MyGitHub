const Koa = require('koa');
const next = require('next');

const { parse } = require('url')

async function serve() {
    const dev = process.env.NODE_ENV !== 'production'
    const server = new Koa()
    const app = next({
        dev,
    })
    await app.prepare()
    const handle = app.getRequestHandler()
    server.use(async (ctx, next) => {
        const parsedUrl = parse(ctx.req.url, true)
        await handle(ctx.req, ctx.res, parsedUrl)
        ctx.respond = false
        await next()
    })

    const port = 3000
    server.listen(port, () => {
        console.log(`--------------------------- Now listening on: ${port}. Press CTRL+C to shut down.`)
    })
}

serve()