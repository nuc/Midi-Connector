import 'react-hot-loader/patch'
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Immutable from 'immutable'

import RootContainer from 'containers/rootContainer'
import rootSaga from 'sagas'
import configureStore from 'store/configureStore'

const store = configureStore(Immutable.Map())
store.runSaga(rootSaga)

require('./index.styl')

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(RootContainer)

if (module.hot) {
  module.hot.accept('./containers/rootContainer', () => render(RootContainer))
}
