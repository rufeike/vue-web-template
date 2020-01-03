# vue web项目基本框架结构模板
>框架基于node(v12.11.1)，npm(^6.9.0)，@vue/cli@4.1.2，开发环境window

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
│   ├─store             仓库文件目录
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
└─...
```


## 相关开发辅助插件
### 浏览器渲染效果兼容处理 normalize.css
>需要在main.js中进行引入配置
- 安装
```shell
$ npm install normalize.css -D
```
- 引入
```js
import 'normalize.css/normalize.css'
```

### 异步交互数据插件 axios
- 安装
```shell
$ npm install axios -D
```
- 引入
```js
import axios from 'axios'
```
### 进度条插件 nprogress
- 安装
```shell
$ npm install nprogress -D
```
- 引入
```js
import 'nprogress/nprogress.css
```



