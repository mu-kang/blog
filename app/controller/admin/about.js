"use strict";

const Controller = require("egg").Controller;

class AboutController extends Controller {
  async index() {
    const { ctx } = this;
    await ctx.redirect("/admin/about/index");
  }

  async about() {
    const { ctx, app } = this;
    let result = await ctx.service.admin.about.details();
    let body = {
      nick: "",
      qq: "",
      email: "",
      describe: "",
      github: "",
      alipay: "",
      wechatpay: "",
      aboutId: "",
      logo: "",
    };
    if (result && result.aboutId) {
      body = result;
    }
    await ctx.render("admin/about.ejs", { result: body });
  }

  async edit() {
    const { ctx, app } = this;
    const {
      nick,
      qq,
      email,
      describe,
      github,
      alipay,
      wechatpay,
      aboutId,
      logo,
    } = ctx.request.body;
    if (aboutId) {
      let result = await ctx.service.admin.about.update(
        { nick, qq, email, describe, github, alipay, wechatpay, logo },
        aboutId
      );
      ctx.body = ctx.helper.successRes(result, "操作成功");
      return;
    }
    let result = await ctx.service.admin.about.create({
      nick,
      qq,
      email,
      describe,
      github,
      alipay,
      wechatpay,
      logo,
    });
    ctx.body = ctx.helper.successRes(result, "操作成功");
  }
}

module.exports = AboutController;
