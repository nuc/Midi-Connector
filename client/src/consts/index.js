import actionNames from 'action-names'

export const midiConnectConsts = Object.assign(actionNames('midiconnections'),
  {
    CREATE_CONNECTION: 'CREATE_CONNECTION',
    createConnection: 'CREATE_CONNECTION',
  }
)
