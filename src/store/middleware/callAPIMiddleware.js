/**
 * Created by kisnows2016/9/21.
 */
import { hideLoading, showLoading, showToast } from '../actions/ui.js'
// import url from '../../config/url.js'
import uri from '../../utils/uri'
/* global fetch */
export default ({dispatch, getState}) => {
  return next => action => {
    const {
      types,
      api,
      callType,
      meta,
      body,
      shouldCallAPI
    } = action
    const state = getState()
    const callTypeList = ['get', 'post']
    if (!api) {
      return next(action)
    }
    if (!(types.start && types.success && types.failure)) {
      throw new Error('Expected types has start && success && failure keys.')
    }
    if (callTypeList.indexOf(callType) === -1) {
      throw new Error(`API callType Must be one of ${callTypeList}`)
    }

    const {start, success, failure} = types
    if (!shouldCallAPI(state)) {
      return false
    }

    dispatch({
      type: start,
      payload: {
        ...body
      },
      meta
    })

    // 所有请求接口都带上来源信息
    let appId = uri('appId') || state.user.source.appId
    const bodyWithSource = Object.assign({}, body, {appId})

    // 删除未定义的字段
    Object.keys(bodyWithSource).forEach((v) => {
      typeof bodyWithSource[v] === 'undefined' && delete bodyWithSource[v]
    })

    const mapCallTypeToFetch = {
      post: () => fetch(api, {
        method: 'post',
        // credentials 设置为每次请求都带上 cookie
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyWithSource)
      }),
      get: () => {
        const toString = Object.keys(bodyWithSource).map(function (key, index) {
          return encodeURIComponent(key) + '=' + encodeURIComponent(bodyWithSource[key])
        }).join('&')
        return fetch(`${api}?${toString}`, {
          method: 'get',
          credentials: 'include',
          headers: {
            'Accept': 'application/json'
          }
        })
      }
    }
    const fetching = mapCallTypeToFetch[callType]()
    let loadingTimer = setTimeout(() => {
      dispatch(showLoading())
    }, 800)
    let loadingTimeOutTimer = setTimeout(() => {
      // dispatch(hideLoading())
      dispatch(showToast('网络加载失败，请重试'))
    }, 10000)

    return fetching.then(res => {
      clearTimeout(loadingTimer)
      dispatch(hideLoading())
      clearTimeout(loadingTimeOutTimer)
      if (res.ok) {
        try {
          return res.json()
        } catch (err) {
          throw new Error(err)
        }
      } else {
        dispatch(showToast('请求出错'))
        return Promise.reject(res.text())
      }
    })
      .then(res => resBehaviour(res))
      .then(res => {
        dispatch({
          type: success,
          meta,
          payload: {
            ...res.data
          }
        })
        return Promise.resolve(res)
      })
      .catch(err => {
        console.error(`接口请求出错,${err}`)
        return Promise.reject(err)
      })

    function resBehaviour (res) {
      // 一些全局业务逻辑处理
      return res
    }
  }
}
