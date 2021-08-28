"use strict";

const Service = require("egg").Service;

class BlogService extends Service {
  // 创建
  async create({ describe, title, content, createId }) {
    return await this.ctx.model.Blog.create({
      describe,
      title,
      content,
      createId,
    });
  }

  // 编辑
  async update({ describe, title, content }, blogId) {
    return await this.ctx.model.Blog.update(
      { describe, title, content },
      { where: { blogId } }
    );
  }

  // 列表
  async list({ typeId, title, status, reads }) {
    const { fn, col, Op } = this.app.Sequelize;
    const where = {};

    if (typeId) {
      where.typeId = typeId;
    }
    if (title) {
      where.title = {
        [Op.like]: `%${title}%`,
      };
    }
    if (status) {
      where.status = Boolean(status);
    }
    if (reads) {
      where.reads = { [Op.gte]: reads };
    }
    return await this.ctx.model.Blog.findAll({
      attributes: [
        "blogId",
        "title",
        "reads",
        "describe",
        "status",
        [
          fn("date_format", col("createdAt"), "%Y-%m-%d %H:%i:%s"),
          "createdTime",
        ],
      ],
      where,
      raw: true,
      // include: [
      //   {
      //     model: this.app.model.User,
      //     as: "createBlog",
      //     required: false,
      //     attributes: ["username", "status", "photo"],
      //   },
      // ],
    });
  }

  // 详情
  async details(blogId) {
    return await this.ctx.model.Blog.findOne({
      where: { blogId },
      include: [
        {
          model: this.app.model.User,
          as: "createBlog",
          required: false,
          attributes: ["username", "status", "photo"],
        },
      ],
    });
  }

  // 状态
  async updateStatus(status, blogId) {
    return await this.ctx.model.Blog.update({ status }, { where: { blogId } });
  }

  // 删除
  async delete(blogId) {
    return await this.ctx.model.Blog.destroy({ where: { blogId } });
  }
}

module.exports = BlogService;
