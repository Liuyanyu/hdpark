const webpack = require("webpack");
const path = require("path");
const px2rem = require("postcss-px2rem");
// const postcss = px2rem({
//   // 基准大小 baseSize，需要和rem.js中相同
//   remUnit: 16
// });

// 使用等比适配插件
// module.exports = {

// };
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  // css: {
  //   loaderOptions: {
  //     postcss: {
  //       plugins: [postcss]
  //     }
  //   }
  // },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "windows.jQuery": "jquery"
        // Popper: ["popper.js", "default"]
      })
    ]
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("@assets", resolve("src/assets"))
      .set("@components", resolve("src/components"))
      .set("@commons", resolve("src/components/commons"));
  },
  baseUrl: "./",
  devServer: {
    open: true,
    host: "localhost",
    port: 8080,
    //以上的ip和端口是我们本机的;下面为需要跨域的
    //publicPath: '../',  //这里解决静态资源引用路径问题
    proxy: {
      // 160
      "/soil": {
        target: "https://hdpark.dreamdeck.cn/dd-web1/web/read/hdpark/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/soil": "/"
        }
      },
      "/url2": {
        target: "https://hdpark.dreamdeck.cn/dd-web/web/read/hdpark/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/url2": "/"
        }
      },
      "/url3": {
        target: "https://hdpark.dreamdeck.cn/dd-web/web/hdpark/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/url3": "/"
        }
      },
      "/url1": {
        target: "https://hdpark.dreamdeck.cn/dd-iot/device/",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/url1": "/"
        }
      },
      "/urlSS": {
        target: "http://192.168.1.156:8080/dd-web/web/", //这里后台的地址模拟的;应该填写你们真实的后台接口
        changOrigin: true, //允许跨域
        pathRewrite: {
          "^/urlSS": "" //请求的时候使用这个api就可以
        }
      },
      "/PatrolRestfulApi.svc": {
        target: "http://10.1.11.146:8001",
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          "^/PatrolRestfulApi.svc": "/PatrolRestfulApi.svc"
        }
      }
    }
  }
};
