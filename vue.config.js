module.exports = {
    "filenameHashing": false,
    "productionSourceMap": false,
    "publicPath": "/",
    "outputDir": "./build",
    "lintOnSave": true,
    "devServer": {
      "proxy": {
        "/": {
          "target": "http://localhost:80",
          "changeOrigin": true,
          "overlay": {
            "warnings": true,
            "errors": true
          }
        }
      }
    },
    "transpileDependencies": [
      "vuetify"
    ],
    
  }
  