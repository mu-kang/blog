"use strict";
module.exports = {
  // 有效时间为30分钟
  getToken(options) {
    const { app } = this;
    return app.jwt.sign(
      { ...options },
      app.config.jwt.secret,
      app.config.jwt.expiresIn
    );
  },

  // 错误返回
  errorRes(data, message) {
    return {
      code: 500,
      data,
      message: message || "请求出错",
    };
  },
  // 成功返回
  successRes(data, message) {
    return {
      code: 200,
      data,
      message: message || "请求成功",
    };
  },
};
