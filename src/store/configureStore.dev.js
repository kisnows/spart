import reducers from './reducers'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import callAPIMiddleware from './middleware/callAPIMiddleware'
import errorMiddleware from './middleware/errorMiddleware.js'
const logger = createLogger()
export default function configureStore (history, initialState) {
  const reduxRouterMiddleware = routerMiddleware(history)
  const middleware = [thunk, callAPIMiddleware, errorMiddleware,
    reduxRouterMiddleware, logger
  ]
  const enhancers = []
  const store = createStore(reducers, initialState, compose(
    applyMiddleware(...middleware),
    ...enhancers
  ))
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers').default)
    })
  }
  return store
}
