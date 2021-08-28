/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // ejs
  config.view = {
    mapping: {
      ".ejs": "ejs",
    },
  };
  config.multipart = {
    fileSize: "50mb",
  };
  config.cluster = {
    listen: {
      path: "",
      port: 2040,
      hostname: "0.0.0.0",
    },
  };
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
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + "_miss_egg";
  config.proxy = true;
  // add your middleware config here
  config.middleware = ["authLogin"];
  config.session = {
    key: "SESSION_ID",
    maxAge: 60 * 60 * 1000,
    httpOnly: true,
    encrypt: true,
    renew: true, // 延长会话有效期
  };
  config.authLogin = {
    enable: true,
    // whiteUrls: ['/test'], // 是使用url的前缀匹配的
    // 不需要登录的页面，白名单URL
    // 也可以使用
    ignore: ["/admin/login", "/admin/from", "/admin", "/", "/about", "/detail"],

    // 使用 match是限制只在这几个页面执行
    // match和ignore不能同时使用
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
