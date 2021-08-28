"use strict";
module.exports = (app, model) => {
  const { STRING, INTEGER, BOOLEAN, TEXT } = app.Sequelize;
  const Blog = model.define(
    "blog",
    {
      blogId: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
        comment: "博客主键id",
      },
      reads: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
        comment: "博客阅读量",
      },
      title: {
        type: STRING(100),
        allowNull: false,
        comment: "博客标题",
      },
      describe: {
        type: STRING(300),
        allowNull: false,
        comment: "博客描述",
      },
      content: {
        type: TEXT,
        allowNull: false,
        comment: "博客内容",
      },
      status: {
        type: BOOLEAN,
        allowNull: false,
        comment: "博客状态",
        defaultValue: true,
      },
      createId: {
        type: INTEGER.UNSIGNED,
        allowNull: false,
        comment: "博客创建人id",
      },
    },
    {
      comment: "博客信息",
    }
  );
  Blog.associate = function () {
    Blog.belongsTo(app.model.User, {
      as: "createBlog",
      foreignKey: "createId",
      targetKey: "userId",
    });
  };
  return Blog;
};
