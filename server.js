const Koa = require('koa');
const next = require('next');
const { parse } = require('url')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });

app.prepare().then(() => {
    const server = new Koa();
    const handle = app.getRequestHandler();

    server.use(async (ctx, next) => {
        const parsedUrl = parse(ctx.req.url, true)
        await handle(ctx.req, ctx.res, parsedUrl)
        ctx.respond = false
        await next()
    });

    server.listen(3000, () => {
        console.log('koa server listening on 3000');
    });
});
