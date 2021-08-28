"use strict";

const Controller = require("egg").Controller;

class LoginController extends Controller {
  async index() {
    this.ctx.redirect("/admin/login");
  }

  async login() {
    const { ctx } = this;
    if (!ctx.session.egg_user) {
      await ctx.render("admin/login.ejs");
    } else {
      ctx.redirect("/admin/blog");
    }
  }

  async from() {
    const { ctx } = this;
    const { username, password } = ctx.request.body;
    await ctx.service.admin.user.create("root", "root");
    let result = await ctx.service.admin.user.login(username, password);
    if (result && result.userId) {
      await ctx.service.admin.record.create(username, ctx.request.ip);
      ctx.session.egg_user = result;
      ctx.body = ctx.helper.successRes({ info: result }, "登录成功");
      return;
    }
    ctx.body = ctx.helper.errorRes(
      ctx.request.body,
      "用户名密码不匹配或者被禁用，请联系管理员"
    );
  }

  async layout() {
    const { ctx, app } = this;
    ctx.session = null;
    await ctx.render("admin/layout.ejs");
  }
}

module.exports = LoginController;
