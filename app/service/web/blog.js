"use strict";

const Service = require("egg").Service;

class BlogService extends Service {
  // 列表
  async list() {
    const { fn, col } = this.app.Sequelize;
    const where = {
      status: true,
    };
    return await this.ctx.model.Blog.findAll({
      attributes: [
        "blogId",
        "title",
        "reads",
        "describe",
        [
          fn("date_format", col("createdAt"), "%Y-%m-%d %H:%i:%s"),
          "createdTime",
        ],
      ],
      where,
      raw: true,
    });
  }

  // 阅读加 1
  async reads(blogId) {
    const { literal } = this.app.Sequelize;
    let result = await this.ctx.model.Blog.update(
      { reads: literal("`reads` +1") },
      { where: { blogId } }
    );
    return result;
  }
  // 详情
  async details(blogId) {
    const { Op, fn, col } = this.app.Sequelize;
    const result = await this.ctx.model.Blog.findOne({
      attributes: [
        "blogId",
        "title",
        "reads",
        "describe",
        "status",
        "content",
        [fn("date_format", col("createdAt"), "%Y-%m-%d %H:%i:%s"), "createdAt"],
      ],
      where: { blogId, status: true },
    });
    const pre = await this.ctx.model.Blog.findOne({
      attributes: ["blogId", "title"],
      where: {
        blogId: {
          [Op.lt]: blogId,
        },
        status: true,
      },
      order: [["blogId", "DESC"]],
      raw: true,
    });
    const next = await this.ctx.model.Blog.findOne({
      attributes: ["blogId", "title"],
      order: [["blogId"]],
      where: {
        blogId: {
          [Op.gt]: blogId,
        },
        status: true,
      },
      raw: true,
    });
    return { details: result, pre, next };
  }
}

module.exports = BlogService;
