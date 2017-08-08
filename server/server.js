const express = require('express')

const app = express()
const aconnect = require('./lib/aconnect.js')

app.get('/midi-devices', (req, res) => {
  aconnect.getMidiDevices().then(devices => {
    return res.send(devices)
  })
})

app.get('/connect', (req, res) => {
  aconnect.connectDevices().then(response => res.send(response))
})

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000')
})
