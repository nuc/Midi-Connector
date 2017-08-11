const promisify = require('es6-promisify')
const cmd = require('node-cmd')

const get = promisify(cmd.get)

const aconnect = {
  getMidiDevices: () => get('echo "[{ id: 0 }]"'),
  connectDevices: (source, target) => get('echo "connected"')
}

module.exports = aconnect
