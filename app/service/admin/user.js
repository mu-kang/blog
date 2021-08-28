"use strict";

const Service = require("egg").Service;

class UserService extends Service {
  // 登录
  async login(username, password) {
    const { fn } = this.app.Sequelize;
    return await this.ctx.model.User.findOne({
      attributes: ["userId", "username", "photo"],
      where: {
        username,
        password: fn("MD5", password),
        status: true,
      },
      raw: true,
    });
  }
  // 判断用户名是否存在
  async find({ username }) {
    return await this.ctx.model.User.findOne({
      attributes: ["userId", "username", "photo"],
      where: { username },
      raw: true,
    });
  }
  // 创建用户
  async create(username, createName, photo, password = "123456") {
    const { fn } = this.app.Sequelize;
    return await this.ctx.model.User.create({
      username,
      createName,
      photo,
      password: fn("MD5", password),
    });
  }
  // 查询有效用户
  async list() {
    const { fn, col } = this.app.Sequelize;
    return await this.ctx.model.User.findAll({
      attributes: [
        "userId",
        "username",
        "createName",
        "photo",
        "status",
        [fn("date_format", col("createdAt"), "%Y-%m-%d %H:%i:%s"), "createdAt"],
      ],
      raw: true,
    });
  }
  // 修改状态
  async status(status, userId) {
    return await this.ctx.model.User.update({ status }, { where: { userId } });
  }
  // 删除
  async delete(userId) {
    return await this.ctx.model.User.destroy({ where: { userId } });
  }
  // 修改信息
  async update(photo, password, userId) {
    const { fn } = this.app.Sequelize;
    return await this.ctx.model.User.update(
      { photo, password: fn("MD5", password) },
      { where: { userId } }
    );
  }
}

module.exports = UserService;
