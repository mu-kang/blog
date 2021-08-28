"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  router.get("/", controller.blog.blog.index);
  router.get("/detail/:blogId", controller.blog.blog.detail);
  router.get("/about", controller.blog.blog.about);
};
