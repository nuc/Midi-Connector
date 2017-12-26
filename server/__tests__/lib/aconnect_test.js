const aconnect = require('../../lib/aconnect')

const mock = `
client 0: 'System' [type=kernel]
    0 'Timer           '
    1 'Announce        '
client 14: 'Midi Through' [type=kernel]
    0 'Midi Through Port-0'
client 20: 'QuNexus' [type=kernel]
    0 'QuNexus MIDI 1  '
	Connecting To: 28:0
    1 'QuNexus MIDI 2  '
    2 'QuNexus MIDI 3  '
client 28: 'USB MIDI Interface' [type=kernel]
    0 'USB MIDI Interface MIDI 1'
  Connected From: 20:0
`

const expected = [
  {
    clientId: 0,
    name: 'System',
    ports: [
      {
        portId: 0,
        portName: 'Timer',
        connectingTo: null,
        connectedFrom: null
      },
      {
        portId: 1,
        portName: 'Announce',
        connectingTo: null,
        connectedFrom: null
      }
    ]
  },
  {
    clientId: 14,
    name: 'Midi Through',
    ports: [
      {
        portId: 0,
        portName: 'Midi Through Port-0',
        connectingTo: null,
        connectedFrom: null
      }
    ]
  },
  {
    clientId: 20,
    name: 'QuNexus',
    ports: [
      {
        portId: 0,
        portName: 'QuNexus MIDI 1',
        connectingTo: '28:0',
        connectedFrom: null
      },
      {
        portId: 1,
        portName: 'QuNexus MIDI 2',
        connectingTo: null,
        connectedFrom: null
      },
      {
        portId: 2,
        portName: 'QuNexus MIDI 3',
        connectingTo: null,
        connectedFrom: null
      }
    ]
  },
  {
    clientId: 28,
    name: 'USB MIDI Interface',
    ports: [
      {
        portId: 0,
        portName: 'USB MIDI Interface MIDI 1',
        connectingTo: null,
        connectedFrom: '20:0'
      }
    ]
  }
]


describe('list devices', () => {
  test('it should work', () => {
    expect(aconnect.formatDevices(mock)).toEqual(expected)
  })
})
describe('connectDevices', () => {
  test('establish connection: failure', () => {
    expect(() => aconnect.handleOutput('Connection is already subscribed')).toThrow()
  })
  test('establish connection: success', () => {
    expect(aconnect.handleOutput('')).toEqual('success')
  })
})
