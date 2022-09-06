// https://code.luasoftware.com/tutorials/vuejs/vuejs-pwa-manifest-icons-and-favicon/
// https://cli.vuejs.org/core-plugins/pwa.html
// https://blog.logrocket.com/building-pwa-vue/
// https://medium.com/@dougallrich/give-users-control-over-app-updates-in-vue-cli-3-pwas-20453aedc1f2
// https://realfavicongenerator.net

const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  pwa: {
    name: "Pytania",
    themeColor: "#ffd100",
    GenerateSW: true
  }
})
