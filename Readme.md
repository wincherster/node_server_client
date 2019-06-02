##  基于nodejs和express的后台管理项目

#### 项目结构

```bash
- public 静态资源
- views 页面模板
  .gitignore
  data.json 本地数据
  index.html 默认页面
  index.js 入口文件
  package.json 配置文件
  Readme.md 项目说明文件
  router.js 路由配置文件
  service.js 业务处理文件
```

#### 启动项目

```bash
npm run dev
```

项目启动后打开预览连接

```bash
127.0.0.1:3030
```

#### 引入了模板引擎 Pug 原名 Jade
1. 先安装`npm i art-template --save`
2. 再安装`express`支持的`npm i express-art-template --save`，使`express`兼容模板引擎