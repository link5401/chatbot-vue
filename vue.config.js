const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],  
  css:{
    loaderOptions:{
      sass:{
        additionalData: `@import "@/assets/style/_variables.sass"`,
      }
    }
  },


})
