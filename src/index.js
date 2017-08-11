/**
 * @author kisnows
 * @create 2016/8/3.
 */
import React from 'react'
import { render } from 'react-dom'
import { Router, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import { AppContainer } from 'react-hot-loader'
import 'react-hot-loader/patch'
import routes from './routes'
import configureStore from './store'
import 'ne-rc/lib/ne.min.css'
import './style/app.scss'

const store = configureStore(hashHistory, {})
const history = syncHistoryWithStore(hashHistory, store)
const root = document.getElementById('root')

const renderRoot = () => {
  render(
    <AppContainer>
      <Provider store={store} key='provider'>
        <Router routes={routes} history={history} key={Math.random()} />
      </Provider>
    </AppContainer>,
    root
  )
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    renderRoot()
  })
}

renderRoot()
