# vue web项目基本框架结构模板
>框架基于node(v12.11.1)，npm(^6.9.0)，@vue/cli@4.1.2，开发环境window，使用vue-cli安装后，根据项目的具体情况，对目录结构进行部分调整

调整如下：
- 在src目录下增加api目录，用于保持服务（接口）调用文件
- 在src/assets目录，增加图片，样式等文件目录，存放各种静态文件
- 在src/components组件目录中，增加global目录，用于存放项目公共的组件
- 在src目录下增加utils目录，用于存放功能性文件


## 安装@vue/cli脚手架
```shell
$ npm install -g @vue/cli
```

### 脚手架创建步骤
- vue create 创建项目
```shell
$ vue create . #在当前项目创建
```
- 创建流程
```shell
$ Vue CLI v4.1.2
$ ? Generate project in current directory? (Y/n) Y #是否在当前创建

$ #选择创建方式
$ ? Please pick a preset:
$ default (babel, eslint) #默认创建插件
$ > Manually select features #手动选择插件，选择手动选择

$ #选择对应的插件
$ ? Please pick a preset: Manually select features
$ ? Check the features needed for your project:
$  (*) Babel
$  ( ) TypeScript
$  ( ) Progressive Web App (PWA) Support
$  (*) Router
$  (*) Vuex
$  (*) CSS Pre-processors
$ >(*) Linter / Formatter
$  ( ) Unit Testing
$  ( ) E2E Testing

$ # 相关选择的选择
$ ? Please pick a preset: Manually select features
$ ? Check the features needed for your project: Babel, Router, Vuex, CSS Pre-processors, Linter
$ ? Use history mode for router? (Requires proper server setup for index fallback in production) No #是否使用history模式，不使用
$ ? Pick a CSS pre-processor (PostCSS, Autoprefixer and CSS Modules are supported by default): Sass/SCSS (with node-sass) #使用node-sass编译 sass文件
$ ? Pick a linter / formatter config: Standard #eslint检验代码标准 选择标准模式
$ ? Pick additional lint features: Lint on save, Lint and fix on commit #代码保持和提交时，均进行代码检测
$ ? Where do you prefer placing config for Babel, ESLint, etc.? In dedicated config files #配置文件单独放置
$ ? Save this as a preset for future projects? (y/N) n #将其保存为将来项目的预置 选择否


```


## 项目目录结构
```html
├─node_modules          第三方模块目录模块
│  └─...
├─public                打包目录 
│  ├─css                css文件目录
│  ├─images             图片文件目录 
│  ├─js                 js文件目录 
│  ├─favicon.ico        图标 
│  └─index.html         打包程序入口文件
├─src
│   ├─api               接口文件目录 
│   │  ├─user           用户模块接口目录 
│   │  └─...
│   ├─assets            保持静态文件目录
│   │  ├─icons          标签图片件夹 
│   │  ├─images         图片文件夹 
│   │  ├─styles         css文件夹 
│   │  └─...
│   ├─components        组件文件目录
│   │  ├─global         公共组件目录 
│   │  └─...
│   ├─router            路由文件目录
│   ├─store             vuex配置文件目录
│   ├─utils             功能性工具目录 
│   │  ├─request.js     请求初始工具 
│   │  └─...
│   ├─views             视图文件目录
│   │  ├─layout         页面整体布局目录 
│   │  ├─user           用户模块目录 
│   │  └─...
│   ├─App.vue           程序首页组件
│   └─main.js           程序入口文件 
├─.browserslistrc       浏览器 
├─.editorconfig         编辑配置文件 
├─.env                  环境配置文件 
├─.env.development      开发环境配置文件 
├─.env.production       生成环境配置文件 
├─.env.test             测试环境配置文件 
├─.eslintrc.js          eslint配置 
├─babel.config.js       babel配置文件
├─package.json          npm配置文件 
├─README.md             框架使用说明文档 
├─vue.config.js         vue配置文件 
└─...
```

### components 组件文件夹

#### 公共组件注册和引入
>把系统中通用部分放置再`@/components/global`文件夹中，如顶部导航，底部信息等
- 需要再components中增加一个`index.js`用于调用和遍历global文件夹中的组件
```js
import Vue from 'vue'

const requireContext = require.context(
  './global', // 遍历global文件夹
  true,
  /\.vue$/
)
requireContext.keys().forEach(filename => {
  const componentConfig = requireContext(filename)
  Vue.component(
    componentConfig.default.name || componentConfig.name, // 获取组件的名称
    componentConfig.default || componentConfig // 获取组件内容
  )
})

```

- 再程序入口`main.js`中引入该文件
```js
import './components' // 引入公共组件
```

- 其他组件中调用
如：再global中增加一个`footer.vue`组件
```html
<template>
  <div>
    <h1>Footer TEST</h1>
  </div>
</template>

<script>
export default {
  name: 'FooterTest'
}
</script>

<style>

</style>

```
调用
```html
<footer-test></footer-test>
<!-- 或 -->
<FooterTest/>
```

### router 路由文件

#### 路由自动加载实现
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

let routes = []

// 动态加载路由，遍历router文件夹中的所有js文件
const requireContext = require.context(
  './', // 查找文件夹的路径
  true, // 是否递归子目录
  /\.js$/ // 查找.js文件正则
)

requireContext.keys().forEach(filename => {
  if (filename === './index.js') return
  const routerModule = requireContext(filename)
  routes = [...routes, ...(routerModule.default || routerModule)]
})

const router = new VueRouter({
  routes
})

// 动态增加路由
router.addRoutes([
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
])

// 导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
```

### .env相关配置文件
>可以在项目中设置，api接口地址，常用参数等，注意配置参数需要使用`VUE_APP_`开头

配置如下：
```.env
VUE_APP_HTTP_HOST = http://jsonplaceholder.typicode.com
VUE_APP_PORT = 8080
```

### router.js中增加导航守卫和进度条
>可以增加用户体验，在导航切换时有进度条等待效果
```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

// 导航守卫
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router

```

## vue配置文件`vue.config.js`
>可以参考vue官方文档和vue中的`E:\vue-web-template\node_modules\@vue\cli-service\lib\config\base.js`配置文件
```js
const path = require('path')

module.exports = {
  css: { // 配置全局样式
    loaderOptions: {
      sass: {
        data: `@impport "~element-ui/packages/theme-chalk/src/index";`
      }
    }
  },
  chainWebpack: config => { // 配置路径别名
    config.resolve.alias
      .set('api', path.resolve(__dirname, './src/api'))
      .set('utils', path.resolve(__dirname, './src/utils'))
  }
}

```



## 相关开发辅助插件
### `element-ui`使用
参考文档：[Element组件文档](https://element.eleme.cn/#/zh-CN/component/installation)

### 浏览器渲染效果兼容处理 normalize.css
>可以不同浏览器渲染效果不一致问题，需要在main.js中进行引入配置
- 安装
```shell
$ npm install normalize.css -D
```
- 引入
```js
import 'normalize.css/normalize.css'
```

### 异步交互数据插件 axios
参考文档：[axios中文文档](http://www.axios-js.com/zh-cn/docs/)

接口测试：[在线REST API](http://jsonplaceholder.typicode.com/)

>使用axios实现ajax的请求，通过配置拦截器实现通用配置的添加
- 从环境变量中获取接口请求的地址（`.env.developent`，`.env.production`）
- 在utils文件下新建文件`request.js，实现axios的实例化和拦截器方法，并导出实例
- 请求拦截中，对用户的授权token进行统一添加
- 响应拦截器，对响应的信息进行统一前置处理，使用`element-ui`的`Message`组件实现信息提醒

- 安装
```shell
$ npm install axios -D
```
- 引入
```js
import axios from 'axios'
```
- 拦截器的使用
```js
import axios from 'axios'
import store from '@/store'
import NProgress from 'nprogress'

//导航条
NProgress.configure({
  showSpintion: false
})

const request = axios.create({
  baseURL: process.env.VUE_APP_HTTP_HOST,//api域名地址
  timeout: 12000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'applicattion/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    config.headers['token'] = store.state.token
    NProgress.start()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    NProgress.done()
    return response
  },
  error => {
    NProgress.done()
    return Promise.rejectt(error)
  }
)

```



### 进度条插件 nprogress
参考文档  [官网文档](http://ricostacruz.com/nprogress/)

>NProgerss可以为路由跳转和ajax请求加载过程中提供友好的进度条效果
>- 路由切换 可以在全局导航守卫中添加
>- ajax请求 可以在请求拦截器和响应拦截器中添加方法


- 安装
```shell
$ npm install nprogress -D
```
- 引入css
```js
import 'nprogress/nprogress.css
```
- 基本使用
```js
import NProgress from 'nprogress'

//初始化
NProgress.configure({
  showSpintion: false
})

//开启
NProgress.start()

//关闭
NProgress.done()

```




