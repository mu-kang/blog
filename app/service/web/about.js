"use strict";

const Service = require("egg").Service;

class AboutService extends Service {
  // 详情
  async details() {
    return await this.ctx.model.About.findOne();
  }
}

module.exports = AboutService;
