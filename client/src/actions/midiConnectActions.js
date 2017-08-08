import { midiConnectConsts } from 'consts'

const midiConnectActions = {
  fetchStart: () => ({
    type: midiConnectConsts.fetchStart
  }),
  fetchSuccess: ({ data }) => ({
    data,
    type: midiConnectConsts.fetchSuccess
  }),
  fetchError: ({ error }) => ({
    error,
    type: midiConnectConsts.fetchError
  }),
  createConnection: connectionData => ({
    connectionData,
    type: midiConnectConsts.createConnection
  })
}

export default midiConnectActions
