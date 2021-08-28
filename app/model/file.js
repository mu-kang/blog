"use strict";
module.exports = (app, model) => {
  const { STRING, INTEGER } = app.Sequelize;
  const File = model.define(
    "file",
    {
      fileId: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: "文件主键id",
      },
      fileType: {
        type: STRING(10),
        allowNull: false,
        comment: "文件类型",
      },
      filePath: {
        type: STRING,
        allowNull: false,
        comment: "文件相对路径",
      },
      createId: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        comment: "文件创建人id",
      },
    },
    {
      comment: "文件上传信息",
    }
  );
  File.associate = function () {
    File.belongsTo(app.model.User, {
      as: "createFile",
      foreignKey: "createId",
      targetKey: "userId",
    });
  };
  return File;
};
