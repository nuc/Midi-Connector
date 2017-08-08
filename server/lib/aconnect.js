const promisify = require('es6-promisify')
const cmd = require('node-cmd')

const get = promisify(cmd.get)

const aconnect = {
  getMidiDevices: () => get('echo "here are devices"'),
  connectDevices: (source, target) => get('echo "connected"')
}

module.exports = aconnect
