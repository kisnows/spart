import {createAction} from 'redux-actions'
import {HOME_INDEX} from '../../config/apis.js'
import initAPI from '../../utils/initAPI.js'
import createAsyncAction from '../../utils/createAsyncAction.js'

export const InitActionCollection = createAsyncAction('home/init')
export const FormChange = 'home/formChange'
export const FormFieldChange = 'home/formFieldChange'

export function init() {
  return initAPI(InitActionCollection, HOME_INDEX, 'get')
}

export const formChange = createAction(FormChange)
