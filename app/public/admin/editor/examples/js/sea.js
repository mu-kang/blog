/* ! Sea.js 2.3.0 | seajs.org/LICENSE.md */
!function(a, b) {
  function c(a) { return function(b) { return {}.toString.call(b) == '[object ' + a + ']'; }; } function d() { return z++; } function e(a) { return a.match(C)[0]; } function f(a) { for (a = a.replace(D, '/'), a = a.replace(F, '$1/'); a.match(E);)a = a.replace(E, '/'); return a; } function g(a) {
    const b = a.length - 1,
      c = a.charAt(b); return c === '#' ? a.substring(0, b) : a.substring(b - 2) === '.js' || a.indexOf('?') > 0 || c === '/' ? a : a + '.js';
  } function h(a) { const b = u.alias; return b && w(b[a]) ? b[a] : a; } function i(a) {
    let b = u.paths,
      c; return b && (c = a.match(G)) && w(b[c[1]]) && (a = b[c[1]] + c[2]), a;
  } function j(a) { const b = u.vars; return b && a.indexOf('{') > -1 && (a = a.replace(H, function(a, c) { return w(b[c]) ? b[c] : a; })), a; } function k(a) {
    const b = u.map,
      c = a; if (b) for (let d = 0, e = b.length; e > d; d++) { const f = b[d]; if (c = y(f) ? f(a) || a : a.replace(f[0], f[1]), c !== a) break; } return c;
  } function l(a, b) {
    let c,
      d = a.charAt(0); if (I.test(a))c = a; else if (d === '.')c = f((b ? e(b) : u.cwd) + a); else if (d === '/') { const g = u.cwd.match(J); c = g ? g[0] + a.substring(1) : a; } else c = u.base + a; return c.indexOf('//') === 0 && (c = location.protocol + c), c;
  } function m(a, b) { if (!a) return ''; a = h(a), a = i(a), a = j(a), a = g(a); let c = l(a, b); return c = k(c); } function n(a) { return a.hasAttribute ? a.src : a.getAttribute('src', 4); } function o(a, b, c) { const d = K.createElement('script'); if (c) { const e = y(c) ? c(a) : c; e && (d.charset = e); }p(d, b, a), d.async = !0, d.src = a, R = d, Q ? P.insertBefore(d, Q) : P.appendChild(d), R = null; } function p(a, b, c) { function d() { a.onload = a.onerror = a.onreadystatechange = null, u.debug || P.removeChild(a), a = null, b(); } const e = 'onload' in a; e ? (a.onload = d, a.onerror = function() { B('error', { uri: c, node: a }), d(); }) : a.onreadystatechange = function() { /loaded|complete/.test(a.readyState) && d(); }; } function q() { if (R) return R; if (S && S.readyState === 'interactive') return S; for (let a = P.getElementsByTagName('script'), b = a.length - 1; b >= 0; b--) { const c = a[b]; if (c.readyState === 'interactive') return S = c; } } function r(a) { const b = []; return a.replace(U, '').replace(T, function(a, c, d) { d && b.push(d); }), b; } function s(a, b) { this.uri = a, this.dependencies = b || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0; } if (!a.seajs) {
    var t = a.seajs = { version: '2.3.0' },
      u = t.data = {},
      v = c('Object'),
      w = c('String'),
      x = Array.isArray || c('Array'),
      y = c('Function'),
      z = 0,
      A = u.events = {}; t.on = function(a, b) { const c = A[a] || (A[a] = []); return c.push(b), t; }, t.off = function(a, b) { if (!a && !b) return A = u.events = {}, t; const c = A[a]; if (c) if (b) for (let d = c.length - 1; d >= 0; d--)c[d] === b && c.splice(d, 1); else delete A[a]; return t; }; var B = t.emit = function(a, b) {
        let c = A[a],
          d; if (c) { c = c.slice(); for (let e = 0, f = c.length; f > e; e++)c[e](b); } return t;
      },
      C = /[^?#]*\//,
      D = /\/\.\//g,
      E = /\/[^/]+\/\.\.\//,
      F = /([^:/])\/+\//g,
      G = /^([^/:]+)(\/.+)$/,
      H = /{([^{]+)}/g,
      I = /^\/\/.|:\//,
      J = /^.*?\/\/.*?\//,
      K = document,
      L = location.href && location.href.indexOf('about:') !== 0 ? e(location.href) : '',
      M = K.scripts,
      N = K.getElementById('seajsnode') || M[M.length - 1],
      O = e(n(N) || L); t.resolve = m; var P = K.head || K.getElementsByTagName('head')[0] || K.documentElement,
      Q = P.getElementsByTagName('base')[0],
      R,
      S; t.request = o; var T = /"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,
      U = /\\\\/g,
      V = t.cache = {},
      W,
      X = {},
      Y = {},
      Z = {},
      $ = s.STATUS = { FETCHING: 1, SAVED: 2, LOADING: 3, LOADED: 4, EXECUTING: 5, EXECUTED: 6 }; s.prototype.resolve = function() { for (var a = this, b = a.dependencies, c = [], d = 0, e = b.length; e > d; d++)c[d] = s.resolve(b[d], a.uri); return c; }, s.prototype.load = function() { const a = this; if (!(a.status >= $.LOADING)) { a.status = $.LOADING; const c = a.resolve(); B('load', c); for (var d = a._remain = c.length, e, f = 0; d > f; f++)e = s.get(c[f]), e.status < $.LOADED ? e._waitings[a.uri] = (e._waitings[a.uri] || 0) + 1 : a._remain--; if (a._remain === 0) return a.onload(), b; const g = {}; for (f = 0; d > f; f++)e = V[c[f]], e.status < $.FETCHING ? e.fetch(g) : e.status === $.SAVED && e.load(); for (const h in g)g.hasOwnProperty(h) && g[h](); } }, s.prototype.onload = function() {
      const a = this; a.status = $.LOADED, a.callback && a.callback(); const b = a._waitings,
        c,
        d; for (c in b)b.hasOwnProperty(c) && (d = V[c], d._remain -= b[c], d._remain === 0 && d.onload()); delete a._waitings, delete a._remain;
    }, s.prototype.fetch = function(a) {
      function c() { t.request(g.requestUri, g.onRequest, g.charset); } function d() {
        delete X[h], Y[h] = !0, W && (s.save(f, W), W = null); let a,
          b = Z[h]; for (delete Z[h]; a = b.shift();)a.load();
      } var e = this,
        f = e.uri; e.status = $.FETCHING; var g = { uri: f }; B('fetch', g); var h = g.requestUri || f; return !h || Y[h] ? (e.load(), b) : X[h] ? (Z[h].push(e), b) : (X[h] = !0, Z[h] = [ e ], B('request', g = { uri: f, requestUri: h, onRequest: d, charset: u.charset }), g.requested || (a ? a[g.requestUri] = c : c()), b);
    }, s.prototype.exec = function() {
      function a(b) { return s.get(a.resolve(b)).exec(); } const c = this; if (c.status >= $.EXECUTING) return c.exports; c.status = $.EXECUTING; const e = c.uri; a.resolve = function(a) { return s.resolve(a, e); }, a.async = function(b, c) { return s.use(b, c, e + '_async_' + d()), a; }; let f = c.factory,
        g = y(f) ? f(a, c.exports = {}, c) : f; return g === b && (g = c.exports), delete c.factory, c.exports = g, c.status = $.EXECUTED, B('exec', c), g;
    }, s.resolve = function(a, b) { const c = { id: a, refUri: b }; return B('resolve', c), c.uri || t.resolve(c.id, b); }, s.define = function(a, c, d) { const e = arguments.length; e === 1 ? (d = a, a = b) : e === 2 && (d = c, x(a) ? (c = a, a = b) : c = b), !x(c) && y(d) && (c = r('' + d)); const f = { id: a, uri: s.resolve(a), deps: c, factory: d }; if (!f.uri && K.attachEvent) { const g = q(); g && (f.uri = g.src); }B('define', f), f.uri ? s.save(f.uri, f) : W = f; }, s.save = function(a, b) { const c = s.get(a); c.status < $.SAVED && (c.id = b.id || a, c.dependencies = b.deps || [], c.factory = b.factory, c.status = $.SAVED, B('save', c)); }, s.get = function(a, b) { return V[a] || (V[a] = new s(a, b)); }, s.use = function(b, c, d) { const e = s.get(d, x(b) ? b : [ b ]); e.callback = function() { for (var b = [], d = e.resolve(), f = 0, g = d.length; g > f; f++)b[f] = V[d[f]].exec(); c && c.apply(a, b), delete e.callback; }, e.load(); }, t.use = function(a, b) { return s.use(a, b, u.cwd + '_use_' + d()), t; }, s.define.cmd = {}, a.define = s.define, t.Module = s, u.fetchedList = Y, u.cid = d, t.require = function(a) { const b = s.get(s.resolve(a)); return b.status < $.EXECUTING && (b.onload(), b.exec()), b.exports; }, u.base = O, u.dir = O, u.cwd = L, u.charset = 'utf-8', t.config = function(a) {
      for (const b in a) {
        let c = a[b],
          d = u[b]; if (d && v(d)) for (const e in c)d[e] = c[e]; else x(d) ? c = d.concat(c) : b === 'base' && (c.slice(-1) !== '/' && (c += '/'), c = l(c)), u[b] = c;
      } return B('config', a), t;
    };
  }
}(this);
