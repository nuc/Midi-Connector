const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const aconnect = require('./lib/aconnect.js')

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE')
  next()
})

app.get('/midi-devices', (req, res) => {
  aconnect.getMidiDevices().then(output =>
    res.send(output)
  )
})

app.post('/connect', (req, res) => {
  const { sourceId, targetId } = req.body
  aconnect.connectDevices({ sourceId, targetId }).then(response => res.send(response))
})

app.delete('/disconnect-all', (req, res) => {
  aconnect.disconnectAllDevices().then(response => res.send(response))
})

app.listen(3000, () => {
  console.log('App listening on http://localhost:3000')
})
