"use strict";

const Service = require("egg").Service;

class FileService extends Service {
  // 创建
  async create(fileType, filePath, createId) {
    const result = await this.ctx.model.File.create({
      fileType,
      filePath,
      createId,
    });
    return result;
  }

  // 列表
  async list(page = 1, size = 10) {
    page = Number(page);
    size = Number(size);
    const limit = size;
    const offset = (page - 1) * size;
    const { rows, count } = await this.ctx.model.File.findAndCountAll({
      include: {
        model: this.app.model.User,
        as: "createFile",
        attributes: ["username", "status", "photo"],
        required: false,
      },
      limit,
      offset,
    });
    return { list: rows, count };
  }
}

module.exports = FileService;
