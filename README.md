[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
# Spart
React 全家桶项目脚手架。

# 技术选型
开发前的**必须知识储备**,请阅读相关文档.
* [React](https://facebook.github.io/react/index.html)
* [React-router](hdttps://github.com/reactjs/react-router#readme)
* [Redux](http://redux.js.org)
    - [redux-thunk](https://github.com/gaearon/redux-thunk)
    - [redux-logger](https://github.com/fcomb/redux-logger#readme)
* [React-redux](https://github.com/gaearon/react-redux)
* [Redux-actions](https://github.com/acdlite/redux-actions)
* [React-router-redux](https://github.com/reactjs/react-router-redux#readme)

# How TO
## 依赖环境
* [Node.js](https://nodejs.org/en/)> 6.10.0
* Npm > 3.0

## 开发环境 
基于以下技术搭建：
* [express](http://expressjs.com/)
* [webpack](https://github.com/webpack/webpack)
* webpack-dev-middleware
* webpack-hot-middleware 

### 语言
* js： ES2015+(stage-2)
* style: scss (兼容：android >4.2, ios > 7.0 )

## 开发命令
### 安装项目依赖
```
npm install
```

### 开发
```
npm run dev
```
默认服务地址 localhost:3001

### 打包
```
npm run dist
```
打包后的文件会放在 dist 文件夹下，每次打包都会删除上一次打包的内容。

### 联调
连接后端开发的电脑进行联调，后端同学机子的 ip 地址在 env.js 里面配置。
```
npm run api
```

### 预览
预览打包后的，将要实际跑在生产环境上的代码。
```
npm run online
```

## 一个 DEMO
可以查看 DEMO 了解项目的运行机制，位于 `src/views/Demo` 下面，通过 `npm run dev` 启动项目，打开浏览器到 `localhost:3000` 查看，自由修改已查看效果。

# 项目目录结构
```
├─data    mock 数据
├─server  开发服务器
├─src     资源目录
│  ├─assets
│  │  └─font
│  ├─components     通用组件
│  │  ├─Pie
│  │  └─PwdAlert
│  ├─config         配置文件
│  ├─routes         路由
│  ├─store          store
│  │  ├─actions     通用 Action
│  │  ├─middleware  中间件
│  │  └─reducers    通用 reducer
│  ├─style
│  │  ├─components
│  │  ├─mixins
│  │  └─theme
│  ├─utils          工具函数
│  ├─vendors        第三方依赖
│  │  └─lrz
│  └─views          视图存放位置
│      ├─Demo       具体页面
│      └─Home
│          └─Card
└─webpack           webpack 配置文件
    └─utils
```

# 路由
项目路由定义在 `src/route/index.js`，开发中可能会有相应调整。

# 应用 Store 结构
```
Store
 - ui       全局 ui 状态
    - toast 提示
      - content 内容
      - show    是否显示
 - routing  路由
 // 具体页面
 - bill 账单相关
 - userStatus 用户状态
```

# 开发规范

## 样式
### 页面
所有 view 必须包含 `page` 的 className, 同时以 `page_**` 命名。
所有样式都继承自此 className 下面。

***页面***
```html
<section className='page page_Home'>
  <BillDayAlert />
  <div>
    <div>
      <p>剩余额度</p>
      <p>￥{creditInfo}</p>
    </div>
    <div>
      <p>我的账单</p>
      <p>下期应还￥{nextBillSummary}</p>
    </div>
  </div>
</section>
```

***样式***
```scss
@import '../../style/_setting.scss';

.page_Home {
  background: #ffff00;
  .alert {
    color: $red_primary;
    font-size: 100px;
  }
  .card {
    text-align: center;
  }
}
```
### 适配
移动端采用的适配方案 rem 和 viewpoint 结合的方法，由于我们视觉稿都是按照 640px 开发的，所以默认情况下 1rem 等于 40px .
可以直接引入 _setting.scss ，并且直接调用 `pxToRem()` 这个 mixin 就可以了。
```scss
@import '../../style/_setting.scss';
.page_Home {
  .button {
    width: pxToRem(140)
  }
}
```

### 组件
所有的通用组件的 `className` 必须以 `component_**` 命名。
```html
<div className='component_pie' ref={ref => {
  this.pie = ref
}}>
  <svg ref={ref => {
    this.svg = ref
  }} />
</div>
```
## Action 
所有 Action 格式必须符合 [FSA 规范](https://github.com/acdlite/flux-standard-action), 建议选择使用 Redux-actions 来生成 ActionCreator
```js
import {createAction} from 'redux-actions'
export const FormChange = 'home/formChange'

export const formChange = createAction(FormChange)
```
## Ajax 请求
通过 `src/util/initApi` 来生成，具体方法查看文件注释。
## Middleware
### callAPIMiddleWare
接口请求中间件，所有包含 `types` 字段的 Action 都会由这个中间件处理，接口请求开始、成功或失败后会 `dispatch` 相对应的普通 Action。
```js
dispatch({
  types: ['example_api:start','example_api:success','example_api:failure'],
  api: 'example_api',
  callType: 'post'
})
```
通过这个中间件后会返回一个 Promise 对象，可以再 dispatch 的地方拿到请求结果。
```js
componentDidMount(){
  this.props.init()
    .then(data => console.log(data))
    .catch(err => console.error(err))
}
```
### errorMiddleware
处理错误的中间件，所有包含以下 `error` 字段的 Action 都会由这个中间件处理，处理后弹出包含错误提示的 `Toast` .
```js
dispatch({
  type: failure,
  payload: new Error(res.msg),
  error: true
})
```
## 代码风格
js 文件基于 standard 规范，所有文件必须通过代码风格校验，通过运行
```bash
npm run lint
```
来查看检测结果。
