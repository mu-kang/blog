"use strict";

const Controller = require("egg").Controller;
const dayjs = require("dayjs");

class BlogController extends Controller {
  async index() {
    const { ctx, app } = this;
    const result = await ctx.service.web.blog.list();
    const details = await ctx.service.web.about.details();
    let about = {
      nick: "",
      qq: "",
      email: "",
      describe: "",
      github: "",
      alipay: "",
      wechatpay: "",
      aboutId: "",
    };
    if (details && details.aboutId) {
      about = details;
    }
    await ctx.render("blog/index.ejs", { result, about });
  }

  async detail() {
    const { ctx, app } = this;
    const { blogId } = ctx.params; // 返回对象格式
    await ctx.service.web.blog.reads(blogId);
    const result = await ctx.service.web.blog.details(blogId);
    let time = dayjs(Date.now()).format("YYYY-MM-DD hh:mm:ss");
    const details = await ctx.service.web.about.details();
    let about = {
      nick: "",
      qq: "",
      email: "",
      describe: "",
      github: "",
      alipay: "",
      wechatpay: "",
      aboutId: "",
    };
    if (details && details.aboutId) {
      about = details;
    }
    await ctx.render("blog/detail.ejs", {
      result: { ...result, time },
      about,
    });
  }

  async about() {
    const { ctx, app } = this;
    const details = await ctx.service.web.about.details();
    let about = {
      nick: "",
      qq: "",
      email: "",
      describe: "",
      github: "",
      alipay: "",
      wechatpay: "",
      aboutId: "",
    };
    if (details && details.aboutId) {
      about = details;
    }
    await ctx.render("blog/about.ejs", { result: about });
  }
}

module.exports = BlogController;
