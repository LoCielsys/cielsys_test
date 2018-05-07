# cielsys_test

> 使用vue-cli构建vue测试用项目

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

### 开发环境配置说明

nodejs   版本6.10及以上
  [link](https://nodejs.org/en/)
  推荐下载稳定版
+ 更新npm包：
    ```npm install npm@latest -g```为最新版本

+ 推荐淘宝镜像
    ```npm config set registry http://registry.npm.taobao.org/```

    需要时再改回去
    ```npm config set registry https://registry.npmjs.org/```

___

###vue-cli#2.0 webpack 配置分析
如果你不太懂vue-cli相关webpack文件，可以戳下面链接：

	https://juejin.im/post/584e48b2ac502e006c74a120

# ☆ 表示重要程度

+ 支付宝回调链接

	- 订单支付成功 http://m.lanhanba.net?shareRedirect=order/paySuccess
	- 拼团支付成功 http://m.lanhanba.net?shareRedirect=group/paySuccess
	- 票据支付成功 http://m.lanhanba.net?shareRedirect=invoice/paySuccess
+ 链接中参数说明
  - shareRedirect   处理支付回调链接的
  - BackKey=1       处理分享的链接可以展示  在app中打开  的按钮，同时隐藏返回按钮
  - key='dsafdsa...'处理app加载页面的授权问题
