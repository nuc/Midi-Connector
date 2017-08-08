import { call, takeEvery, put } from 'redux-saga/effects'

import { midiConnectActions } from 'actions'
import { midiConnectConsts } from 'consts'
import { backend } from 'services'

export function* fetchMidiConnections() {
  try {
    const midiConnections = yield call(backend.fetchMidiConnections)
    yield put(
      midiConnectActions.fetchSuccess({ data: midiConnections })
    )
  } catch (error) {
    yield put(
      midiConnectActions.fetchError({ error: error.message })
    )
  }
}

export function* watchMidiConnectionsFetch() {
  yield takeEvery(midiConnectConsts.fetchStart, fetchMidiConnections)
}
