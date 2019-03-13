const parseDeviceListOutput = output =>
  output
    .split('client ')
    .filter(client => Boolean(client) && client.trim().length)
    .map(client =>
      client
        .split('\n')
        .filter(Boolean)
        .reduce(splitClientsAndPorts, {})
    )

const splitClientsAndPorts = (prev, current, index) => {
  if (index === 0) {
    // Prepare client basic data
    const [, clientId] = current.match(/(\d+):/)
    const [, name] = current.match(/'(.*?)'/)
    prev.name = name
    prev.clientId = parseInt(clientId)
  } else if (/Connecting/.test(current)) {
    // Set port destination
    const [, destination] = current.match(/To: (\d+:\d+)/)
    prev.ports[prev.ports.length - 1].connectingTo = destination
  } else if (/Connected/.test(current)) {
    // Set port source
    const [, source] = current.match(/From: (\d+:\d+)/)
    prev.ports[prev.ports.length - 1].connectedFrom = source
  } else {
    // Prepare port basic data
    prev.ports = prev.ports || []
    try {
      const [, portId] = current.match(/\s(\d+)\s/)
      const [, portName] = current.match(/'(.*?)'/)
      const port = {
        portName: portName.trim(),
        portId: parseInt(portId),
        connectingTo: null,
        connectedFrom: null
      }
      prev.ports.push(port)
    } catch (error) {
      console.log(error)
      return prev
    }
  }
  return prev
}

const noOutputIsGoodOuputHandler = output => {
  if (output.trim().length === 0) {
    return 'success'
  } else {
    throw Error(output)
  }
}

module.exports.parseDeviceListOutput = parseDeviceListOutput
module.exports.noOutputIsGoodOuputHandler = noOutputIsGoodOuputHandler
