const promisify = require('es6-promisify')
const cmd = require('node-cmd')
const {
  parseDeviceListOutput,
  noOutputIsGoodOuputHandler
} = require('./formatting')
const get = promisify(cmd.get)

const aconnect = {
  getMidiDevices: () =>
    get('aconnect -l')
    .then(parseDeviceListOutput),

  connectDevices: ({ sourceId, targetId }) =>
    get(`aconnect ${sourceId} ${targetId}`)
    .then(noOutputIsGoodOuputHandler),

  disconnectAllDevices: () =>
    get(`aconnect -x`)
    .then(noOutputIsGoodOuputHandler)
}

module.exports = aconnect
