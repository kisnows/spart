import reducers from './reducers'
import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import { routerMiddleware } from 'react-router-redux'
import callAPIMiddleware from './middleware/callAPIMiddleware'
import errorMiddleware from './middleware/errorMiddleware.js'

export default function configureStore (history, initialState) {
  const reduxRouterMiddleware = routerMiddleware(history)
  const middleware = [thunk, callAPIMiddleware, errorMiddleware, reduxRouterMiddleware]
  const enhancers = []
  return createStore(reducers, initialState, compose(
    applyMiddleware(...middleware),
    ...enhancers
  ))
}
