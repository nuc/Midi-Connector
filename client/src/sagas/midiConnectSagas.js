import { call, takeEvery, put } from 'redux-saga/effects'

import { midiConnectActions } from 'actions'
import { midiConnectConsts } from 'consts'
import { backend } from 'services'

export function* fetchMidiConnections() {
  try {
    const response = yield call(backend.fetchMidiConnections)
    yield put(
      midiConnectActions.fetchSuccess({ data: response.body })
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
    yield put(midiConnectActions.createConnectionSuccess())
    yield call(fetchMidiConnections)
  } catch (error) {
    yield put(midiConnectActions.createConnectionFailure({ error: error.message }))
  }
}

export function* disconnect() {
  try {
    yield call(backend.disconnectAll)
    yield put(midiConnectActions.disconnectSuccess())
    yield call(fetchMidiConnections)
  } catch (error) {
    yield put(midiConnectActions.disconnectFailure({ error: error.message }))
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
