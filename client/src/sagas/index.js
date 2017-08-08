import { fork, all } from 'redux-saga/effects'

import { watchMidiConnectionsFetch } from './midiConnectSagas'

export default function* root() {
  yield all([
    fork(watchMidiConnectionsFetch),
  ])
}
