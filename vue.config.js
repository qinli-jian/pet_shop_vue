const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // 网页标题
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "顶针的动物朋友";
      return args;
    });
  },
})
