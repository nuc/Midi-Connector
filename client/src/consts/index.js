import actionNames from 'action-names'

export const midiConnectConsts = Object.assign(actionNames('midiconnections'),
  {
    CREATE_CONNECTION_START: 'CREATE_CONNECTION_START',
    createConnectionStart: 'CREATE_CONNECTION_START',
    CREATE_CONNECTION_SUCCESS: 'CREATE_CONNECTION_SUCCESS',
    createConnectionSuccess: 'CREATE_CONNECTION_SUCCESS',
    CREATE_CONNECTION_FAILURE: 'CREATE_CONNECTION_FAILURE',
    createConnectionFailure: 'CREATE_CONNECTION_FAILURE',
    DISCONNECT_START: 'DISCONNECT_START',
    disconnectStart: 'DISCONNECT_START',
    DISCONNECT_SUCCESS: 'DISCONNECT_SUCCESS',
    disconnectSuccess: 'DISCONNECT_SUCCESS',
    DISCONNECT_FAILURE: 'DISCONNECT_FAILURE',
    disconnectFailure: 'DISCONNECT_FAILURE'
  }
)
