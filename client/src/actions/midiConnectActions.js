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
  createConnectionStart: ({ sourceId, targetId }) => ({
    sourceId,
    targetId,
    type: midiConnectConsts.createConnectionStart
  }),
  createConnectionSuccess: () => ({
    type: midiConnectConsts.createConnectionSuccess
  }),
  createConnectionFailure: ({ error }) => ({
    error,
    type: midiConnectConsts.createConnectionFailure
  }),
  disconnectStart: () => ({
    type: midiConnectConsts.disconnectStart
  }),
  disconnectSuccess: () => ({
    type: midiConnectConsts.disconnectSuccess
  }),
  disconnectFailure: ({ error }) => ({
    error,
    type: midiConnectConsts.disconnectFailure
  })
}

export default midiConnectActions
