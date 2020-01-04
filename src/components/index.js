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
