const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const koaBody = require('koa-body')

const aconnect = require('./lib/aconnect.js')

const app = new Koa()
const router = new Router()

// app.use(cors)

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      message: err.message
    }
  }
})

router.get('/midi-devices', async (ctx, next) => {
  const devices = await aconnect.getMidiDevices()
  ctx.response.status = 200
  ctx.body = devices
  next()
})

router.post('/connect', koaBody(), async (ctx, next) => {
  const { sourceId, targetId } = ctx.request.body
  await aconnect.connectDevices({ sourceId, targetId })
  next()
})

router.delete('/disconnect-all', async (ctx, next) => {
  await aconnect.disconnectAllDevices()
  next()
})

app.use(router.routes())

module.exports = app.listen(3000)
