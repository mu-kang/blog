"use strict";
module.exports = (app, model) => {
  const { STRING, INTEGER } = app.Sequelize;
  const About = model.define(
    "about",
    {
      aboutId: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: "主键id",
      },
      nick: {
        type: STRING(20),
        allowNull: false,
        comment: "昵称",
      },
      qq: {
        type: STRING(16),
        allowNull: false,
        comment: "qq",
        validate: {
          is: /^\+?[1-9][0-9]*$/,
        },
      },
      email: {
        type: STRING(30),
        allowNull: false,
        comment: "邮箱",
        validate: {
          isEmail: true,
        },
      },
      describe: {
        type: STRING,
        allowNull: false,
        comment: "简介",
      },
      github: {
        type: STRING,
        allowNull: false,
        comment: "github地址",
      },
      logo: {
        type: STRING,
        allowNull: false,
        comment: "支付宝收款码",
        defaultValue: "/public/blog/images/scribble.png",
      },
      alipay: {
        type: STRING,
        allowNull: false,
        comment: "支付宝收款码",
      },
      wechatpay: {
        type: STRING,
        allowNull: false,
        comment: "微信收款码",
      },
    },
    {
      comment: "关于我的信息",
    }
  );
  return About;
};
