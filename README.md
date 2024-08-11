# 兴趣圈前端

## React + Vite + Tailwind CSS

Github Actions里有提交后自动打包部署的脚本

里面的所有url均为部署在阿里云服务器上的域名，不是本地域名。

gh-pages分支里存放了打包后的产物。

### 两种启动方式：

①下载源代码解压后，在根目录下依次执行：

`npm install`

`npm run build`

`npm run dev`

②下载自动打包好了的gh-pages分支下的代码，解压后在根目录下执行：

`npm run preview`

### 关于为什么Github Pages打开来是一片空白

我在`vite.config.js`文件下没有加上`base:'/xingququan-frontend/'`，因为加了后下载代码在本地进行`npm run build`再启动会报错。

但是如果加了这一行，Github Pages还是无法显示全部内容，因为GitHub Pages通过https加载，而后端服务器是http协议，会有错误。所以请不要使用GitHub
Pages。
要访问的话请访问
http://47.99.174.164
