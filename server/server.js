const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')

const aconnect = require('./lib/aconnect.js')

const app = new Koa()
const router = new Router()

// app.use(cors)

router.get('/midi-devices', async (ctx, next) => {
  const devices = await aconnect.getMidiDevices()
  console.log(devices)
  ctx.response.status = 200
  ctx.body = devices
  next()
})

app.use(router.routes())

module.exports = app.listen(3000)

// app.post('/connect', (req, res) => {
//   const { sourceId, targetId } = req.body
//   aconnect.connectDevices({ sourceId, targetId }).then(response => res.send(response))
// })

// app.delete('/disconnect-all', (req, res) => {
//   aconnect.disconnectAllDevices().then(response => res.send(response))
// })

// app.listen(3000, () => {
//   console.log('App listening on http://localhost:3000')
// })
