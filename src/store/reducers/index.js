/**
 * @author kisnows
 * @create 2016/8/3.
 */
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import api from './api'
import ui from './ui.js'
import views from './views'

export default combineReducers({
  api,
  ui,
  ...views,
  routing: routerReducer
})
