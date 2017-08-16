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

export function* createConnection({ sourceId, targetId }) {
  try {
    yield call(backend.createConnection, { sourceId, targetId })
    yield put(midiConnectActions.createConnectionSuccess, { sourceId, targetId })
  } catch (error) {
    yield put(midiConnectActions.createConnectionFailure, error)
  }
}

export function* disconnect() {
  try {
    yield call(backend.disconnectAll)
    yield put(midiConnectActions.disconnectSuccess)
  } catch (error) {
    yield put(midiConnectActions.disconnectFailure, error)
  }
}

export function* watchMidiConnectionsFetch() {
  yield takeEvery(midiConnectConsts.fetchStart, fetchMidiConnections)
}

export function* watchMidiConnectionCreation() {
  yield takeEvery(midiConnectConsts.createConnectionStart, createConnection)
}

export function* watchMidiDisconnection() {
  yield takeEvery(midiConnectConsts.disconnectStart, disconnect)
}
