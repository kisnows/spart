/**
 * 全局 Ui 状态
 */
import { TOAST } from '../actions/ui.js'

const initState = {
  toast: {
    show: false,
    content: '',
    icon: '',
    timeout: 3000
  }
}

export default function (state = initState, action) {
  const type = action.type
  const payload = action.payload
  const meta = action.meta
  const error = action.error
  switch (type) {
    case TOAST:
      return {
        ...state,
        toast: {
          show: meta.show,
          content: payload.content,
          icon: payload.icon,
          timeout: meta.timeout
        }
      }
    default:
      return state
  }
}
