"use strict";

const Controller = require("egg").Controller;
const nanoid = require("nanoid");
const fs = require("fs");
const sendToWormhole = require("stream-wormhole");
// 故名思意 异步二进制 写入流
const awaitWriteStream = require("await-stream-ready").write;
const dayjs = require("dayjs");
const fsToll = require("fs-extra");
const path = require("path");

class BlogController extends Controller {
  async index() {
    const { ctx, app } = this;
    await ctx.redirect("/admin/blog/list");
  }

  async list() {
    const { ctx, app } = this;
    let result = await ctx.service.admin.blog.list({});
    await ctx.render("admin/index.ejs", { result });
  }

  async status() {
    const { ctx, app } = this;
    const { blogId, status } = ctx.request.body;
    let result = await ctx.service.admin.blog.updateStatus(status, blogId);
    ctx.body = ctx.helper.successRes(result, "操作成功");
  }

  async edit() {
    const { ctx, app } = this;
    await ctx.redirect("/admin/blog/edit/0");
  }

  async detail() {
    const { ctx, app } = this;
    const { blogId } = ctx.params; // 返回对象格式
    let result = await ctx.service.admin.blog.details(blogId);
    let body = { describe: "", title: "", content: "", blogId: "" };
    if (result && result.blogId) {
      body = result;
    }

    await ctx.render("admin/detail.ejs", { result: body });
  }

  async from() {
    const { ctx, app } = this;
    const { describe, title, content, blogId } = ctx.request.body;
    if (blogId) {
      let result = await ctx.service.admin.blog.update(
        { describe, title, content },
        blogId
      );
      ctx.body = ctx.helper.successRes(result, "操作成功");
      return;
    }
    let result = await ctx.service.admin.blog.create({
      describe,
      title,
      content,
      createId: ctx.session.egg_user.userId,
    });
    ctx.body = ctx.helper.successRes(result, "操作成功");
  }

  async upload() {
    const { ctx, app } = this;
    const filePath = `/public/uploads/${dayjs(Date.now()).format(
      "YYYY/MM/DD"
    )}/`;
    await fsToll.ensureDir(path.join(this.config.baseDir, "app" + filePath)); // 生成文件夹 ，如果存在则不生成
    const stream = await ctx.getFileStream();
    const extname = path.extname(stream.filename).toLowerCase(); // 文件扩展名称
    const fileName = nanoid.nanoid() + extname; // 文件名
    const target = path.join(this.config.baseDir, "app", filePath, fileName); // 文件存放目录位置

    const writeStream = fs.createWriteStream(target); // 存储文件 创造可写流

    try {
      await awaitWriteStream(stream.pipe(writeStream)); // 文件存储等待机制 将可读性流写入可写流
      await ctx.service.admin.file.create(
        extname,
        filePath + fileName,
        ctx.session.egg_user.userId
      );
      ctx.body = ctx.helper.successRes(
        { url: filePath + fileName },
        "上传成功"
      );
    } catch (e) {
      // 销费文件流
      await sendToWormhole(stream);
      throw e;
    }
  }
}

module.exports = BlogController;
