/**
 * Created by kisnows on 2016/11/30.
 */
export default {
  get: (name) => {
    try {
      return window.localStorage.getItem(name)
    } catch (err) {
      console.error(err)
    }
  },
  set: (name, value) => {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    window.localStorage.setItem(name, value)
  },
  remove: (name) => {
    try {
      window.localStorage.removeItem(name)
    } catch (err) {
      throw new Error(`Can not remove this key,${err}`)
    }
  }
}
