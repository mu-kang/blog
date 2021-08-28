"use strict";
module.exports = (app) => {
  app.beforeStart(async () => {
    // 写入该方法会自动创建表
    await app.model.sync();
  });
};
