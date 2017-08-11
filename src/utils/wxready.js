/**
 * Created by kisnows on 2016/9/29.
 */
import wx from '../vendors/jweixin'
/* global wx */
export default function () {
  return new Promise(function (resolve, reject) {
    const url = window.location.href.split('#')[0]
    const encodeUrl = window.encodeURIComponent(url)
    fetch(`/open/wechat/jsapi?url=${encodeUrl}`, {
      method: 'get',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then(
        function (resp) {
          // alert(JSON.stringify(resp))
          if (resp.code === 0) {
            // alert(JSON.stringify(resp))
            const appId = resp.data.appId
            const timestamp = resp.data.timestamp
            const nonceStr = resp.data.nonceStr
            const signature = resp.data.signature
            const jsApiList = [
              'chooseImage',
              'previewImage',
              'uploadImage',
              'downloadImage',
              'onMenuShareTimeline',
              'onMenuShareAppMessage',
              'onMenuShareQQ',
              'onMenuShareWeibo',
              'onMenuShareQZone'
            ]
            wx.config({
              debug: false,
              appId: appId,
              timestamp: timestamp,
              nonceStr: nonceStr,
              signature: signature,
              jsApiList: jsApiList
            })
            wx.ready(function () {
              resolve(resp.data)
            })

            wx.error(function (err) {
              reject(err, 'jsapi初始化失败')
            })
          } else {
            reject('意外的返回值')
          }
        },
        function (err) {
          reject(err, '请求失败')
        }
      )
  })
}
