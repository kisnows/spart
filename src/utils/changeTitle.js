/**
 * Created by kisnows on 2016/9/20.
 * hack 微信等 webview 下 title 无法修改的问题
 */
import favicon from 'images/ajax-loader.gif'
import env from './env'
export default function (title) {
  document.title = title
  if (env.isios && env.isweixin) {
    const body = document.getElementsByTagName('body')[0]
    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.setAttribute('src', 'favicon')
    iframe.addEventListener('load', function () {
      setTimeout(function () {
        iframe.removeEventListener('load', null)
        document.body.removeChild(iframe)
      }, 0)
    })
    document.body.appendChild(iframe)
  }
}
