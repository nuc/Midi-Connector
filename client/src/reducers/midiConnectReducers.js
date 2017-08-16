import { fromJS } from 'immutable'

import { midiConnectConsts } from 'consts'

const initialState = fromJS({
  itemStatus: {
    status: null,
    statusCode: null,
    details: null
  },
  midiDevices: [],
  connections: {}
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

    default:
      return state
  }
}


export default midiConnectReducers
