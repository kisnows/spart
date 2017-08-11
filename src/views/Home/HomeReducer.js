import {
  InitActionCollection,
  FormChange
} from './HomeAction.js'

const initState = {
  status: 10,
  startAuth: 1,
  data: {
    name: {
      value: '抹桥 '
    },
    phone: {},
    gender: {}
  },
  isComplete: false
}

export default function (state = initState, action) {
  const type = action.type
  const payload = action.payload
  const meta = action.meta
  switch (type) {
    case InitActionCollection.start:
      return state
    case InitActionCollection.success:
      const {status, startAuth} = payload
      return {
        ...state,
        status,
        startAuth
      }
    case InitActionCollection.failure:
      return state
    case FormChange:
      return {
        ...state,
        ...payload,
        data: {
          ...payload.data
        }
      }
    default:
      return state
  }
}
