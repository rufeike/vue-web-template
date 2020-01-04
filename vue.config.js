const path = require('path')

module.exports = {
  css: { // 配置全局样式
    loaderOptions: {
      sass: {
        data: `@import "~element-ui/packages/theme-chalk/src/common/var";`
      }
    }
  },
  chainWebpack: config => { // 配置路径别名
    config.resolve.alias
      .set('api', path.resolve(__dirname, './src/api'))
      .set('utils', path.resolve(__dirname, './src/utils'))
  }
}
