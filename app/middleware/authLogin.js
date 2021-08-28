module.exports = (options, app) => {

  return async function authLogin(ctx, next) {
    const ignore = options.ignore || [];

    // 如果ctx.url在白名单中
    const isIgnore = ignore.some(item => ctx.request.url === item);

    if (!isIgnore) {

      if (!ctx.session.egg_user) {
        ctx.redirect('/admin/login'); // 让用户去登录
      } else {
        await next();
      }
    } else {
      // 白名单
      // if (ctx.session.egg_user && ctx.request.url === '/admin/login') {
      //   ctx.redirect('/admin/blog');
      //   return false;
      // }
      await next();
    }
  };
};
