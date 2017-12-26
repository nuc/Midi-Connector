import { fromJS } from 'immutable'
import randomColor from 'randomcolor'

import { midiConnectConsts } from 'consts'

const initialState = fromJS({
  fetchStatus: {
    status: null,
    statusCode: null,
    details: null
  },
  createConnection: {
    status: null,
    statusCode: null,
    details: null
  },
  disconnectStatus: {
    status: null,
    statusCode: null,
    details: null
  },
  midiDevices: []
})

const populateColors = clients => clients
  .map(client => {
    client.ports = client.ports.map(port => {
      if (port.color) {
        return port
      }
      port.color = randomColor({ hue: 'random' })
      return port
    })
    return client
  })

const midiConnectReducers = (state = initialState, action) => {
  switch (action.type) {
    case midiConnectConsts.fetchStart:
      return state.setIn(['fetchStatus', 'status'], 'fetching')

    case midiConnectConsts.fetchError:
      return state.mergeIn(['fetchStatus'], {
        status: 'error',
        statusCode: action.error
      })

    case midiConnectConsts.fetchSuccess:
      return state.merge({
        fetchStatus: { status: 'fetched' },
        midiDevices: populateColors(action.data)
      })

    case midiConnectConsts.createConnectionStart:
      return state.setIn(['createConnection', 'status'], 'creating')

    case midiConnectConsts.createConnectionFailure:
      return state.mergeIn(['createConnection'], {
        status: 'error',
        error: action.error
      })

    case midiConnectConsts.createConnectionSuccess:
      return state.setIn(['createConnection', 'status'], 'created')

    case midiConnectConsts.disconnectStart:
      return state.setIn(['disconnectStatus', 'status'], 'disconnecting')

    case midiConnectConsts.disconnectFailure:
      return state.mergeIn(['disconnectStatus'], {
        status: 'error',
        statusCode: action.error
      })

    case midiConnectConsts.disconnectSuccess:
      return state.setIn(['disconnectStatus', 'status'], 'disconnected')

    default:
      return state
  }
}


export default midiConnectReducers
