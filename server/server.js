const express = require('express')

const app = express()
const aconnect = require('./lib/aconnect.js')

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/midi-devices', (req, res) => {
  aconnect.getMidiDevices().then(devices => {
    return res.send(JSON.parse(devices))
  })
})

app.get('/connect', (req, res) => {
  aconnect.connectDevices().then(response => res.send(response))
})

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000')
})
