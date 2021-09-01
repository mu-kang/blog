# blog

> 该项目是一个以 nodejs 为基础的博客项目

点击 [egg docs][egg] 官方文档.

## 部署

> 步骤一

配置项目数据库信息 `config/config.default.js`

```javascript
// 数据库
config.sequelize = {
  dialect: "mysql",
  host: "",
  password: "",
  database: "",
  port: 3306,
  username: "",
  timezone: "+8:00",
  define: {
    // model的全局配置
    timestamps: true, // 添加create,update,delete时间戳
    paranoid: true, // 添加软删除
    freezeTableName: true, // 防止修改表名为复数
    underscored: false, // 防止驼峰式字段被默认转为下划线
  },
};
```

> 步骤二

创建数据库(mysql)

```sql
 CREATE DATABASE IF NOT EXISTS `blog_app` DEFAULT CHARACTER SET utf8 DEFAULT COLLATE utf8_general_ci;
```

> 步骤三

运行项目

```bash
 npm install
 npm start
```

> 步骤四

创建管理后台账号(mysql)

```sql
 INSERT INTO `user` ( `username`,`password`, `status`,`createdAt`,`updatedAt` ) VALUES ('admin',MD5('123456'),1,NOW(),NOW());
```

> 步骤五

登录管理后台账号：http://localhost:2040/admin

## 目录结构

```
egg-project
├── package.json
├── app.js (可选)
├── agent.js (可选)
├── app
|   ├── router.js
│   ├── controller
│   |   └── home.js
│   ├── service (可选)
│   |   └── user.js
│   ├── middleware (可选)
│   |   └── response_time.js
│   ├── schedule (可选)
│   |   └── my_task.js
│   ├── public (可选)
│   |   └── reset.css
│   ├── view (可选)
│   |   └── home.tpl
│   └── extend (可选)
│       ├── helper.js (可选)
│       ├── request.js (可选)
│       ├── response.js (可选)
│       ├── context.js (可选)
│       ├── application.js (可选)
│       └── agent.js (可选)
├── config
|   ├── plugin.js
|   ├── config.default.js
│   ├── config.prod.js
|   ├── config.test.js (可选)
|   ├── config.local.js (可选)
|   └── config.unittest.js (可选)
└── test
    ├── middleware
    |   └── response_time.test.js
    └── controller
        └── home.test.js
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

[egg]: https://eggjs.org
