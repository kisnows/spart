/**
 * Created by kisnows2017/3/02.
 * 当分发一个 error 为 true  的 action 时，提示错误。
 */
import { showToast } from '../actions/ui.js'
export default ({dispatch, getState}) => next => action => {
  const {error, payload} = action
  if (error) {
    dispatch(showToast(payload.toString()))
  }
  return next(action)
}
