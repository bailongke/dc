const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  devServer: {
    proxy: {
      // '/api': {
      //   target: 'http://localhost:4500/',
      //   changeOrigin: true,
      //   pathRewrite: { '^/api': '' }
      // }
      '/bind': {
        target: 'http://qq.tools.dc-eve.com',
        changeOrigin: true,
        pathRewrite: { '^/bind': '' }
      }
    },
  },
  transpileDependencies: true
})