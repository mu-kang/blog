"use strict";
module.exports = (app, model) => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;
  const Record = model.define(
    "record",
    {
      recordId: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: "主键id",
      },
      username: {
        type: STRING(50),
        allowNull: false,
        comment: "登录用户",
      },
      ip: {
        type: STRING(50),
        allowNull: false,
        comment: "登录IP",
      },
    },
    {
      comment: "访问记录",
    }
  );

  return Record;
};
