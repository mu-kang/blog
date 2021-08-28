"use strict";

const Service = require("egg").Service;

class AboutService extends Service {
  // 创建
  async create({ nick, qq, email, describe, github, alipay, wechatpay, logo }) {
    return await this.ctx.model.About.create({
      nick,
      qq,
      email,
      describe,
      github,
      alipay,
      wechatpay,
      logo,
    });
  }

  // 编辑
  async update(
    { nick, qq, email, describe, github, alipay, wechatpay, logo },
    aboutId
  ) {
    return await this.ctx.model.About.update(
      {
        nick,
        qq,
        email,
        describe,
        github,
        alipay,
        wechatpay,
        logo,
      },
      { where: { aboutId } }
    );
  }

  // 详情
  async details() {
    const result = await this.ctx.model.About.findOne();
    return result;
  }
}

module.exports = AboutService;
