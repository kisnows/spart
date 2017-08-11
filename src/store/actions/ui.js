/**
 * 全局 Ui 状态
 */

export const TOAST = 'ui/toast'

function toast (show, {
  content = '加载中',
  icon = '',
  timeout = 2000
} = {}) {
  return {
    type: TOAST,
    payload: {
      content,
      icon
    },
    meta: {
      show,
      timeout
    }
  }
}

export function showToast (content, icon) {
  return toast(true, {
    content,
    icon
  })
}

export function hideToast () {
  return toast(false)
}

export function showLoading (content = '加载中', icon = 'loading') {
  return toast(true, {
    content,
    icon,
    timeout: -1
  })
}

export function hideLoading () {
  return toast(false)
}
