import { fork, all } from 'redux-saga/effects'

import {
  watchMidiConnectionsFetch,
  watchMidiConnectionCreation,
  watchMidiDisconnection
} from './midiConnectSagas'

export default function* root() {
  yield all([
    fork(watchMidiConnectionsFetch),
    fork(watchMidiConnectionCreation),
    fork(watchMidiDisconnection)
  ])
}
