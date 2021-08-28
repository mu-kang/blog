"use strict";

const Service = require("egg").Service;

class RecordService extends Service {
  // 创建
  async create(username, ip) {
    console.log(username, ip);
    return await this.ctx.model.Record.create({ username, ip });
  }

  // 列表
  async list() {
    return await this.ctx.model.Record.findAll();
  }
}

module.exports = RecordService;
