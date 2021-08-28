"use strict";

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;
  const authLogin = app.middleware.authLogin({
    ignore: ["/admin/login", "/admin/from", "/admin"],
  });
  router.get("/admin", controller.admin.login.index);
  router.get("/admin/login", authLogin, controller.admin.login.login);

  router.post("/admin/from", controller.admin.login.from);
  router.get("/admin/layout", authLogin, controller.admin.login.layout);
  // blog
  router.get("/admin/blog", authLogin, controller.admin.blog.index);
  router.post("/admin/blog/status", authLogin, controller.admin.blog.status);
  router.get("/admin/blog/list", authLogin, controller.admin.blog.list);
  // blog edit
  router.get("/admin/blog/edit", authLogin, controller.admin.blog.edit);
  router.get(
    "/admin/blog/edit/:blogId",
    authLogin,
    controller.admin.blog.detail
  );
  router.post("/admin/blog/from", authLogin, controller.admin.blog.from);
  router.post("/admin/blog/upload", authLogin, controller.admin.blog.upload);
  // about
  router.get("/admin/about", authLogin, controller.admin.about.index);
  router.get("/admin/about/index", authLogin, controller.admin.about.about);
  router.post("/admin/about/edit", authLogin, controller.admin.about.edit);
};
