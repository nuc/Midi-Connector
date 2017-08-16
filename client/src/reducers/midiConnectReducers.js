import { fromJS } from 'immutable'

import { midiConnectConsts } from 'consts'

const initialState = fromJS({
  itemStatus: {
    status: null,
    statusCode: null,
    details: null
  },
  midiDevices: [],
  connections: {
    status: null,
    connections: []
  }
})

const midiConnectReducers = (state = initialState, action) => {
  switch (action.type) {

    case midiConnectConsts.fetchStart:
      return state.setIn(['itemStatus', 'status'], 'fetching')

    case midiConnectConsts.fetchError:
      return state.mergeIn(['itemStatus'], {
        status: 'error',
        statusCode: action.error
      })

    case midiConnectConsts.fetchSuccess:
      return state.merge({
        itemStatus: { status: 'fetched' },
        midiDevices: action.data
      })

    case midiConnectConsts.createConnectionStart:
      return state.setIn(['connections', 'status'], 'creating')

    case midiConnectConsts.createConnectionSuccess:
      const { sourceId, targetId } = action
      return state
        .setIn(['connections', 'status'], 'connected')
        .updateIn(['connections', 'connections'], arr => arr.push({ sourceId, targetId }))

    case midiConnectConsts.createConnectionFailure:
      return state
        .setIn(['connections', 'status'], 'failed')

    default:
      return state
  }
}


export default midiConnectReducers
