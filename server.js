const Koa = require('koa')
const Router = require('koa-router')
const cors = require('@koa/cors')
const koaBody = require('koa-body')

const aconnect = require('./lib/aconnect.js')

const app = new Koa()
const router = new Router()

app.use(cors({ origin: '*' }))

app.use(async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = err.statusCode || err.status || 500
    ctx.body = {
      message: err.message
    }
  }
})

// const expected = [
//   {
//     clientId: 0,
//     name: 'System',
//     ports: [
//       {
//         portId: 0,
//         portName: 'Timer',
//         connectingTo: null,
//         connectedFrom: null
//       },
//       {
//         portId: 1,
//         portName: 'Announce',
//         connectingTo: null,
//         connectedFrom: null
//       }
//     ]
//   },
//   {
//     clientId: 14,
//     name: 'Midi Through',
//     ports: [
//       {
//         portId: 0,
//         portName: 'Midi Through Port-0',
//         connectingTo: null,
//         connectedFrom: null
//       }
//     ]
//   },
//   {
//     clientId: 20,
//     name: 'QuNexus',
//     ports: [
//       {
//         portId: 0,
//         portName: 'QuNexus MIDI 1',
//         connectingTo: '28:0',
//         connectedFrom: null
//       },
//       {
//         portId: 1,
//         portName: 'QuNexus MIDI 2',
//         connectingTo: null,
//         connectedFrom: null
//       },
//       {
//         portId: 2,
//         portName: 'QuNexus MIDI 3',
//         connectingTo: null,
//         connectedFrom: null
//       }
//     ]
//   },
//   {
//     clientId: 28,
//     name: 'USB MIDI Interface',
//     ports: [
//       {
//         portId: 0,
//         portName: 'USB MIDI Interface MIDI 1',
//         connectingTo: null,
//         connectedFrom: '20:0'
//       }
//     ]
//   }
// ]

router.get('/', async (ctx, next) => {
  ctx.response.status = 200
  ctx.body = 'Hi there!'
  next()
})

router.get('/midi-devices', async (ctx, next) => {
  const devices = await aconnect.getMidiDevices()
  // const devices = expected
  ctx.response.status = 200
  ctx.body = devices
  next()
})

router.post('/connect', koaBody(), async (ctx, next) => {
  const { sourceId, targetId } = ctx.request.body
  await aconnect.connectDevices({ sourceId, targetId })
  ctx.response.status = 201
  next()
})

router.delete('/disconnect-all', async (ctx, next) => {
  await aconnect.disconnectAllDevices()
  ctx.response.status = 204
  next()
})

app.use(router.routes())

module.exports = app.listen(3000)
