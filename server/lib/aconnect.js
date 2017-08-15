const promisify = require('es6-promisify')
const cmd = require('node-cmd')

const get = promisify(cmd.get)

const aconnect = {
  getMidiDevices: () => {
    return get('aconnect -l').then(output => {
      const clients = output
        .split('client ')
        .filter(Boolean)
        .map(client =>
          client
            .split('\n')
            .filter(Boolean)
            .reduce((prev, current, index) => {
              if (index === 0) {
                const [, clientId] = current.match(/(\d+):/)
                const [, name] = current.match(/'(.*?)'/)
                prev = {
                  name,
                  clientId: parseInt(clientId)
                }
              } else {
                prev.ports = prev.ports || []
                const [, portId] = current.match(/\s(\d+)\s/)
                const [, portName] = current.match(/'(.*?)'/)
                const port = {
                  portName: portName.trim(),
                  portId: parseInt(portId)
                }
                prev.ports.push(port)
              }
              return prev
            }, {})
        )
      return clients
    })
  },
  connectDevices: (source, target) => get('echo "connected"')
}

module.exports = aconnect
