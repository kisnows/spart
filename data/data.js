/**
 * Created by kisnows on 2016/9/12.
 * 所有 Mock 接口数据，所有接口的排列按照接口文档顺序来，以免出现重复
 */
/* eslint-disable */
module.exports = {
  // 首页初始化
  '/home/index': {
    "code": 0,
    "msg": "成功",
    "redirect": 1, // 首页
    "data": {
      "test": 234
    }
  },
  '/home/link': {
    'code': 1,
    'msg': '操作成功',
    'redirect': 3, //重定向至进度页（fromItems=true）
    'data': {
      'test': 7
    }
  }
}
