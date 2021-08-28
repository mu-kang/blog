"use strict";
module.exports = (app, model) => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;
  const User = model.define(
    "user",
    {
      userId: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: "管理员用户主键id",
      },
      username: {
        type: STRING(30),
        allowNull: false,
        comment: "管理员用户账户",
      },
      password: {
        type: STRING(100),
        allowNull: false,
        comment: "管理员用户密码",
      },
      photo: {
        type: STRING(100),
        allowNull: false,
        comment: "管理员用户头像",
        defaultValue:
          '"https://oss.nodekoa.com/mukang/blog/2021/06/11/OXPQxz5cCLXl6Iid8IBoa.jpeg"',
      },
      status: {
        type: BOOLEAN,
        allowNull: false,
        comment: "管理员用户状态",
        defaultValue: true,
      },
    },
    {
      comment: "管理员用户信息",
    }
  );
  return User;
};
