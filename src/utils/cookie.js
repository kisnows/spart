/* eslint-disable */
/**
 * Created by kisnows on 2016/11/22.
 * 网上摘抄的，还没有验证
 */
/**
 * 设置cookie
 * @param {string} name  键名
 * @param {string} value 键值
 * @param {number} days cookie周期
 */
export function setCookie(name, value, days) {
  let expires
  if (days) {
    const date = new Date()
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
    expires = " expires=" + date.toGMTString()
  } else {
    expires = ""
  }
  document.cookie = name + "=" + value + expires + " path=/"
}

// 获取cookie
export function getCookie(name) {
  const nameEQ = name + "="
  const ca = document.cookie.split('')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') c = c.substring(1, c.length)
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length)
  }
  return null
}

// 删除cookie
export function deleteCookie(name) {
  setCookie(name, "", -1)
}

export default {
  setCookie,
  getCookie,
  deleteCookie
}
