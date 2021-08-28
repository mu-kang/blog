/* ! jQuery v1.11.1 | (c) 2005, 2014 jQuery Foundation, Inc. | jquery.org/license */
!function(a, b) { typeof module === 'object' && typeof module.exports === 'object' ? module.exports = a.document ? b(a, !0) : function(a) { if (!a.document) throw new Error('jQuery requires a window with a document'); return b(a); } : b(a); }(typeof window !== 'undefined' ? window : this, function(a, b) {
  var c = [],
    d = c.slice,
    e = c.concat,
    f = c.push,
    g = c.indexOf,
    h = {},
    i = h.toString,
    j = h.hasOwnProperty,
    k = {},
    l = '1.11.1',
    m = function(a, b) { return new m.fn.init(a, b); },
    n = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    o = /^-ms-/,
    p = /-([\da-z])/gi,
    q = function(a, b) { return b.toUpperCase(); }; m.fn = m.prototype = { jquery: l, constructor: m, selector: '', length: 0, toArray() { return d.call(this); }, get(a) { return a != null ? a < 0 ? this[a + this.length] : this[a] : d.call(this); }, pushStack(a) { const b = m.merge(this.constructor(), a); return b.prevObject = this, b.context = this.context, b; }, each(a, b) { return m.each(this, a, b); }, map(a) { return this.pushStack(m.map(this, function(b, c) { return a.call(b, c, b); })); }, slice() { return this.pushStack(d.apply(this, arguments)); }, first() { return this.eq(0); }, last() { return this.eq(-1); }, eq(a) {
    const b = this.length,
      c = +a + (a < 0 ? b : 0); return this.pushStack(c >= 0 && b > c ? [ this[c] ] : []);
  }, end() { return this.prevObject || this.constructor(null); }, push: f, sort: c.sort, splice: c.splice }, m.extend = m.fn.extend = function() {
    let a,
      b,
      c,
      d,
      e,
      f,
      g = arguments[0] || {},
      h = 1,
      i = arguments.length,
      j = !1; for (typeof g === 'boolean' && (j = g, g = arguments[h] || {}, h++), typeof g === 'object' || m.isFunction(g) || (g = {}), h === i && (g = this, h--); i > h; h++) if ((e = arguments[h]) != null) for (d in e)a = g[d], c = e[d], g !== c && (j && c && (m.isPlainObject(c) || (b = m.isArray(c))) ? (b ? (b = !1, f = a && m.isArray(a) ? a : []) : f = a && m.isPlainObject(a) ? a : {}, g[d] = m.extend(j, f, c)) : void 0 !== c && (g[d] = c)); return g;
  }, m.extend({ expando: 'jQuery' + (l + Math.random()).replace(/\D/g, ''), isReady: !0, error(a) { throw new Error(a); }, noop() {}, isFunction(a) { return m.type(a) === 'function'; }, isArray: Array.isArray || function(a) { return m.type(a) === 'array'; }, isWindow(a) { return a != null && a == a.window; }, isNumeric(a) { return !m.isArray(a) && a - parseFloat(a) >= 0; }, isEmptyObject(a) { let b; for (b in a) return !1; return !0; }, isPlainObject(a) { let b; if (!a || m.type(a) !== 'object' || a.nodeType || m.isWindow(a)) return !1; try { if (a.constructor && !j.call(a, 'constructor') && !j.call(a.constructor.prototype, 'isPrototypeOf')) return !1; } catch (c) { return !1; } if (k.ownLast) for (b in a) return j.call(a, b); for (b in a);return void 0 === b || j.call(a, b); }, type(a) { return a == null ? a + '' : typeof a === 'object' || typeof a === 'function' ? h[i.call(a)] || 'object' : typeof a; }, globalEval(b) { b && m.trim(b) && (a.execScript || function(b) { a.eval.call(a, b); })(b); }, camelCase(a) { return a.replace(o, 'ms-').replace(p, q); }, nodeName(a, b) { return a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase(); }, each(a, b, c) {
    let d,
      e = 0,
      f = a.length,
      g = r(a); if (c) { if (g) { for (;f > e; e++) if (d = b.apply(a[e], c), d === !1) break; } else for (e in a) if (d = b.apply(a[e], c), d === !1) break; } else if (g) { for (;f > e; e++) if (d = b.call(a[e], e, a[e]), d === !1) break; } else for (e in a) if (d = b.call(a[e], e, a[e]), d === !1) break; return a;
  }, trim(a) { return a == null ? '' : (a + '').replace(n, ''); }, makeArray(a, b) { const c = b || []; return a != null && (r(Object(a)) ? m.merge(c, typeof a === 'string' ? [ a ] : a) : f.call(c, a)), c; }, inArray(a, b, c) { let d; if (b) { if (g) return g.call(b, a, c); for (d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0; d > c; c++) if (c in b && b[c] === a) return c; } return -1; }, merge(a, b) {
    let c = +b.length,
      d = 0,
      e = a.length; while (c > d)a[e++] = b[d++]; if (c !== c) while (void 0 !== b[d])a[e++] = b[d++]; return a.length = e, a;
  }, grep(a, b, c) { for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)d = !b(a[f], f), d !== h && e.push(a[f]); return e; }, map(a, b, c) {
    let d,
      f = 0,
      g = a.length,
      h = r(a),
      i = []; if (h) for (;g > f; f++)d = b(a[f], f, c), d != null && i.push(d); else for (f in a)d = b(a[f], f, c), d != null && i.push(d); return e.apply([], i);
  }, guid: 1, proxy(a, b) {
    let c,
      e,
      f; return typeof b === 'string' && (f = a[b], b = a, a = f), m.isFunction(a) ? (c = d.call(arguments, 2), e = function() { return a.apply(b || this, c.concat(d.call(arguments))); }, e.guid = a.guid = a.guid || m.guid++, e) : void 0;
  }, now() { return +new Date(); }, support: k }), m.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function(a, b) { h['[object ' + b + ']'] = b.toLowerCase(); }); function r(a) {
    const b = a.length,
      c = m.type(a); return c === 'function' || m.isWindow(a) ? !1 : a.nodeType === 1 && b ? !0 : c === 'array' || b === 0 || typeof b === 'number' && b > 0 && b - 1 in a;
  } const s = function(a) {
    let b,
      c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u = 'sizzle' + -new Date(),
      v = a.document,
      w = 0,
      x = 0,
      y = gb(),
      z = gb(),
      A = gb(),
      B = function(a, b) { return a === b && (l = !0), 0; },
      C = 'undefined',
      D = 1 << 31,
      E = {}.hasOwnProperty,
      F = [],
      G = F.pop,
      H = F.push,
      I = F.push,
      J = F.slice,
      K = F.indexOf || function(a) { for (let b = 0, c = this.length; c > b; b++) if (this[b] === a) return b; return -1; },
      L = 'checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped',
      M = '[\\x20\\t\\r\\n\\f]',
      N = '(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+',
      O = N.replace('w', 'w#'),
      P = '\\[' + M + '*(' + N + ')(?:' + M + '*([*^$|!~]?=)' + M + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + O + '))|)' + M + '*\\]',
      Q = ':(' + N + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + P + ')*)|.*)\\)|)',
      R = new RegExp('^' + M + '+|((?:^|[^\\\\])(?:\\\\.)*)' + M + '+$', 'g'),
      S = new RegExp('^' + M + '*,' + M + '*'),
      T = new RegExp('^' + M + '*([>+~]|' + M + ')' + M + '*'),
      U = new RegExp('=' + M + "*([^\\]'\"]*?)" + M + '*\\]', 'g'),
      V = new RegExp(Q),
      W = new RegExp('^' + O + '$'),
      X = { ID: new RegExp('^#(' + N + ')'), CLASS: new RegExp('^\\.(' + N + ')'), TAG: new RegExp('^(' + N.replace('w', 'w*') + ')'), ATTR: new RegExp('^' + P), PSEUDO: new RegExp('^' + Q), CHILD: new RegExp('^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(' + M + '*(even|odd|(([+-]|)(\\d*)n|)' + M + '*(?:([+-]|)' + M + '*(\\d+)|))' + M + '*\\)|)', 'i'), bool: new RegExp('^(?:' + L + ')$', 'i'), needsContext: new RegExp('^' + M + '*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(' + M + '*((?:-\\d)?\\d*)' + M + '*\\)|)(?=[^-]|$)', 'i') },
      Y = /^(?:input|select|textarea|button)$/i,
      Z = /^h\d$/i,
      $ = /^[^{]+\{\s*\[native \w/,
      _ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      ab = /[+~]/,
      bb = /'|\\/g,
      cb = new RegExp('\\\\([\\da-f]{1,6}' + M + '?|(' + M + ')|.)', 'ig'),
      db = function(a, b, c) { const d = '0x' + b - 65536; return d !== d || c ? b : d < 0 ? String.fromCharCode(d + 65536) : String.fromCharCode(d >> 10 | 55296, 1023 & d | 56320); }; try { I.apply(F = J.call(v.childNodes), v.childNodes), F[v.childNodes.length].nodeType; } catch (eb) {
      I = { apply: F.length ? function(a, b) { H.apply(a, J.call(b)); } : function(a, b) {
        let c = a.length,
          d = 0; while (a[c++] = b[d++]);a.length = c - 1;
      } };
    } function fb(a, b, d, e) {
      let f,
        h,
        j,
        k,
        l,
        o,
        r,
        s,
        w,
        x; if ((b ? b.ownerDocument || b : v) !== n && m(b), b = b || n, d = d || [], !a || typeof a !== 'string') return d; if ((k = b.nodeType) !== 1 && k !== 9) return []; if (p && !e) { if (f = _.exec(a)) if (j = f[1]) { if (k === 9) { if (h = b.getElementById(j), !h || !h.parentNode) return d; if (h.id === j) return d.push(h), d; } else if (b.ownerDocument && (h = b.ownerDocument.getElementById(j)) && t(b, h) && h.id === j) return d.push(h), d; } else { if (f[2]) return I.apply(d, b.getElementsByTagName(a)), d; if ((j = f[3]) && c.getElementsByClassName && b.getElementsByClassName) return I.apply(d, b.getElementsByClassName(j)), d; } if (c.qsa && (!q || !q.test(a))) { if (s = r = u, w = b, x = k === 9 && a, k === 1 && b.nodeName.toLowerCase() !== 'object') { o = g(a), (r = b.getAttribute('id')) ? s = r.replace(bb, '\\$&') : b.setAttribute('id', s), s = "[id='" + s + "'] ", l = o.length; while (l--)o[l] = s + qb(o[l]); w = ab.test(a) && ob(b.parentNode) || b, x = o.join(','); } if (x) try { return I.apply(d, w.querySelectorAll(x)), d; } catch (y) {} finally { r || b.removeAttribute('id'); } } } return i(a.replace(R, '$1'), b, d, e);
    } function gb() { const a = []; function b(c, e) { return a.push(c + ' ') > d.cacheLength && delete b[a.shift()], b[c + ' '] = e; } return b; } function hb(a) { return a[u] = !0, a; } function ib(a) { let b = n.createElement('div'); try { return !!a(b); } catch (c) { return !1; } finally { b.parentNode && b.parentNode.removeChild(b), b = null; } } function jb(a, b) {
      let c = a.split('|'),
        e = a.length; while (e--)d.attrHandle[c[e]] = b;
    } function kb(a, b) {
      const c = b && a,
        d = c && a.nodeType === 1 && b.nodeType === 1 && (~b.sourceIndex || D) - (~a.sourceIndex || D); if (d) return d; if (c) while (c = c.nextSibling) if (c === b) return -1; return a ? 1 : -1;
    } function lb(a) { return function(b) { const c = b.nodeName.toLowerCase(); return c === 'input' && b.type === a; }; } function mb(a) { return function(b) { const c = b.nodeName.toLowerCase(); return (c === 'input' || c === 'button') && b.type === a; }; } function nb(a) {
      return hb(function(b) {
        return b = +b, hb(function(c, d) {
          let e,
            f = a([], c.length, b),
            g = f.length; while (g--)c[e = f[g]] && (c[e] = !(d[e] = c[e]));
        });
      });
    } function ob(a) { return a && typeof a.getElementsByTagName !== C && a; }c = fb.support = {}, f = fb.isXML = function(a) { const b = a && (a.ownerDocument || a).documentElement; return b ? b.nodeName !== 'HTML' : !1; }, m = fb.setDocument = function(a) {
      let b,
        e = a ? a.ownerDocument || a : v,
        g = e.defaultView; return e !== n && e.nodeType === 9 && e.documentElement ? (n = e, o = e.documentElement, p = !f(e), g && g !== g.top && (g.addEventListener ? g.addEventListener('unload', function() { m(); }, !1) : g.attachEvent && g.attachEvent('onunload', function() { m(); })), c.attributes = ib(function(a) { return a.className = 'i', !a.getAttribute('className'); }), c.getElementsByTagName = ib(function(a) { return a.appendChild(e.createComment('')), !a.getElementsByTagName('*').length; }), c.getElementsByClassName = $.test(e.getElementsByClassName) && ib(function(a) { return a.innerHTML = "<div class='a'></div><div class='a i'></div>", a.firstChild.className = 'i', a.getElementsByClassName('i').length === 2; }), c.getById = ib(function(a) { return o.appendChild(a).id = u, !e.getElementsByName || !e.getElementsByName(u).length; }), c.getById ? (d.find.ID = function(a, b) { if (typeof b.getElementById !== C && p) { const c = b.getElementById(a); return c && c.parentNode ? [ c ] : []; } }, d.filter.ID = function(a) { const b = a.replace(cb, db); return function(a) { return a.getAttribute('id') === b; }; }) : (delete d.find.ID, d.filter.ID = function(a) { const b = a.replace(cb, db); return function(a) { const c = typeof a.getAttributeNode !== C && a.getAttributeNode('id'); return c && c.value === b; }; }), d.find.TAG = c.getElementsByTagName ? function(a, b) { return typeof b.getElementsByTagName !== C ? b.getElementsByTagName(a) : void 0; } : function(a, b) {
        let c,
          d = [],
          e = 0,
          f = b.getElementsByTagName(a); if (a === '*') { while (c = f[e++])c.nodeType === 1 && d.push(c); return d; } return f;
      }, d.find.CLASS = c.getElementsByClassName && function(a, b) { return typeof b.getElementsByClassName !== C && p ? b.getElementsByClassName(a) : void 0; }, r = [], q = [], (c.qsa = $.test(e.querySelectorAll)) && (ib(function(a) { a.innerHTML = "<select msallowclip=''><option selected=''></option></select>", a.querySelectorAll("[msallowclip^='']").length && q.push('[*^$]=' + M + "*(?:''|\"\")"), a.querySelectorAll('[selected]').length || q.push('\\[' + M + '*(?:value|' + L + ')'), a.querySelectorAll(':checked').length || q.push(':checked'); }), ib(function(a) { const b = e.createElement('input'); b.setAttribute('type', 'hidden'), a.appendChild(b).setAttribute('name', 'D'), a.querySelectorAll('[name=d]').length && q.push('name' + M + '*[*^$|!~]?='), a.querySelectorAll(':enabled').length || q.push(':enabled', ':disabled'), a.querySelectorAll('*,:x'), q.push(',.*:'); })), (c.matchesSelector = $.test(s = o.matches || o.webkitMatchesSelector || o.mozMatchesSelector || o.oMatchesSelector || o.msMatchesSelector)) && ib(function(a) { c.disconnectedMatch = s.call(a, 'div'), s.call(a, "[s!='']:x"), r.push('!=', Q); }), q = q.length && new RegExp(q.join('|')), r = r.length && new RegExp(r.join('|')), b = $.test(o.compareDocumentPosition), t = b || $.test(o.contains) ? function(a, b) {
        const c = a.nodeType === 9 ? a.documentElement : a,
          d = b && b.parentNode; return a === d || !(!d || d.nodeType !== 1 || !(c.contains ? c.contains(d) : a.compareDocumentPosition && 16 & a.compareDocumentPosition(d)));
      } : function(a, b) { if (b) while (b = b.parentNode) if (b === a) return !0; return !1; }, B = b ? function(a, b) { if (a === b) return l = !0, 0; let d = !a.compareDocumentPosition - !b.compareDocumentPosition; return d ? d : (d = (a.ownerDocument || a) === (b.ownerDocument || b) ? a.compareDocumentPosition(b) : 1, 1 & d || !c.sortDetached && b.compareDocumentPosition(a) === d ? a === e || a.ownerDocument === v && t(v, a) ? -1 : b === e || b.ownerDocument === v && t(v, b) ? 1 : k ? K.call(k, a) - K.call(k, b) : 0 : 4 & d ? -1 : 1); } : function(a, b) {
        if (a === b) return l = !0, 0; let c,
          d = 0,
          f = a.parentNode,
          g = b.parentNode,
          h = [ a ],
          i = [ b ]; if (!f || !g) return a === e ? -1 : b === e ? 1 : f ? -1 : g ? 1 : k ? K.call(k, a) - K.call(k, b) : 0; if (f === g) return kb(a, b); c = a; while (c = c.parentNode)h.unshift(c); c = b; while (c = c.parentNode)i.unshift(c); while (h[d] === i[d])d++; return d ? kb(h[d], i[d]) : h[d] === v ? -1 : i[d] === v ? 1 : 0;
      }, e) : n;
    }, fb.matches = function(a, b) { return fb(a, null, null, b); }, fb.matchesSelector = function(a, b) { if ((a.ownerDocument || a) !== n && m(a), b = b.replace(U, "='$1']"), !(!c.matchesSelector || !p || r && r.test(b) || q && q.test(b))) try { const d = s.call(a, b); if (d || c.disconnectedMatch || a.document && a.document.nodeType !== 11) return d; } catch (e) {} return fb(b, n, null, [ a ]).length > 0; }, fb.contains = function(a, b) { return (a.ownerDocument || a) !== n && m(a), t(a, b); }, fb.attr = function(a, b) {
      (a.ownerDocument || a) !== n && m(a); let e = d.attrHandle[b.toLowerCase()],
        f = e && E.call(d.attrHandle, b.toLowerCase()) ? e(a, b, !p) : void 0; return void 0 !== f ? f : c.attributes || !p ? a.getAttribute(b) : (f = a.getAttributeNode(b)) && f.specified ? f.value : null;
    }, fb.error = function(a) { throw new Error('Syntax error, unrecognized expression: ' + a); }, fb.uniqueSort = function(a) {
      let b,
        d = [],
        e = 0,
        f = 0; if (l = !c.detectDuplicates, k = !c.sortStable && a.slice(0), a.sort(B), l) { while (b = a[f++])b === a[f] && (e = d.push(f)); while (e--)a.splice(d[e], 1); } return k = null, a;
    }, e = fb.getText = function(a) {
      let b,
        c = '',
        d = 0,
        f = a.nodeType; if (f) { if (f === 1 || f === 9 || f === 11) { if (typeof a.textContent === 'string') return a.textContent; for (a = a.firstChild; a; a = a.nextSibling)c += e(a); } else if (f === 3 || f === 4) return a.nodeValue; } else while (b = a[d++])c += e(b); return c;
    }, d = fb.selectors = { cacheLength: 50, createPseudo: hb, match: X, attrHandle: {}, find: {}, relative: { '>': { dir: 'parentNode', first: !0 }, ' ': { dir: 'parentNode' }, '+': { dir: 'previousSibling', first: !0 }, '~': { dir: 'previousSibling' } }, preFilter: { ATTR(a) { return a[1] = a[1].replace(cb, db), a[3] = (a[3] || a[4] || a[5] || '').replace(cb, db), a[2] === '~=' && (a[3] = ' ' + a[3] + ' '), a.slice(0, 4); }, CHILD(a) { return a[1] = a[1].toLowerCase(), a[1].slice(0, 3) === 'nth' ? (a[3] || fb.error(a[0]), a[4] = +(a[4] ? a[5] + (a[6] || 1) : 2 * (a[3] === 'even' || a[3] === 'odd')), a[5] = +(a[7] + a[8] || a[3] === 'odd')) : a[3] && fb.error(a[0]), a; }, PSEUDO(a) {
      let b,
        c = !a[6] && a[2]; return X.CHILD.test(a[0]) ? null : (a[3] ? a[2] = a[4] || a[5] || '' : c && V.test(c) && (b = g(c, !0)) && (b = c.indexOf(')', c.length - b) - c.length) && (a[0] = a[0].slice(0, b), a[2] = c.slice(0, b)), a.slice(0, 3));
    } }, filter: { TAG(a) { const b = a.replace(cb, db).toLowerCase(); return a === '*' ? function() { return !0; } : function(a) { return a.nodeName && a.nodeName.toLowerCase() === b; }; }, CLASS(a) { let b = y[a + ' ']; return b || (b = new RegExp('(^|' + M + ')' + a + '(' + M + '|$)')) && y(a, function(a) { return b.test(typeof a.className === 'string' && a.className || typeof a.getAttribute !== C && a.getAttribute('class') || ''); }); }, ATTR(a, b, c) { return function(d) { let e = fb.attr(d, a); return e == null ? b === '!=' : b ? (e += '', b === '=' ? e === c : b === '!=' ? e !== c : b === '^=' ? c && e.indexOf(c) === 0 : b === '*=' ? c && e.indexOf(c) > -1 : b === '$=' ? c && e.slice(-c.length) === c : b === '~=' ? (' ' + e + ' ').indexOf(c) > -1 : b === '|=' ? e === c || e.slice(0, c.length + 1) === c + '-' : !1) : !0; }; }, CHILD(a, b, c, d, e) {
      const f = a.slice(0, 3) !== 'nth',
        g = a.slice(-4) !== 'last',
        h = b === 'of-type'; return d === 1 && e === 0 ? function(a) { return !!a.parentNode; } : function(b, c, i) {
        let j,
          k,
          l,
          m,
          n,
          o,
          p = f !== g ? 'nextSibling' : 'previousSibling',
          q = b.parentNode,
          r = h && b.nodeName.toLowerCase(),
          s = !i && !h; if (q) { if (f) { while (p) { l = b; while (l = l[p]) if (h ? l.nodeName.toLowerCase() === r : l.nodeType === 1) return !1; o = p = a === 'only' && !o && 'nextSibling'; } return !0; } if (o = [ g ? q.firstChild : q.lastChild ], g && s) { k = q[u] || (q[u] = {}), j = k[a] || [], n = j[0] === w && j[1], m = j[0] === w && j[2], l = n && q.childNodes[n]; while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if (l.nodeType === 1 && ++m && l === b) { k[a] = [ w, n, m ]; break; } } else if (s && (j = (b[u] || (b[u] = {}))[a]) && j[0] === w)m = j[1]; else while (l = ++n && l && l[p] || (m = n = 0) || o.pop()) if ((h ? l.nodeName.toLowerCase() === r : l.nodeType === 1) && ++m && (s && ((l[u] || (l[u] = {}))[a] = [ w, m ]), l === b)) break; return m -= e, m === d || m % d === 0 && m / d >= 0; }
      };
    }, PSEUDO(a, b) {
      let c,
        e = d.pseudos[a] || d.setFilters[a.toLowerCase()] || fb.error('unsupported pseudo: ' + a); return e[u] ? e(b) : e.length > 1 ? (c = [ a, a, '', b ], d.setFilters.hasOwnProperty(a.toLowerCase()) ? hb(function(a, c) {
        let d,
          f = e(a, b),
          g = f.length; while (g--)d = K.call(a, f[g]), a[d] = !(c[d] = f[g]);
      }) : function(a) { return e(a, 0, c); }) : e;
    } }, pseudos: { not: hb(function(a) {
      const b = [],
        c = [],
        d = h(a.replace(R, '$1')); return d[u] ? hb(function(a, b, c, e) {
        let f,
          g = d(a, null, e, []),
          h = a.length; while (h--)(f = g[h]) && (a[h] = !(b[h] = f));
      }) : function(a, e, f) { return b[0] = a, d(b, null, f, c), !c.pop(); };
    }), has: hb(function(a) { return function(b) { return fb(a, b).length > 0; }; }), contains: hb(function(a) { return function(b) { return (b.textContent || b.innerText || e(b)).indexOf(a) > -1; }; }), lang: hb(function(a) { return W.test(a || '') || fb.error('unsupported lang: ' + a), a = a.replace(cb, db).toLowerCase(), function(b) { let c; do if (c = p ? b.lang : b.getAttribute('xml:lang') || b.getAttribute('lang')) return c = c.toLowerCase(), c === a || c.indexOf(a + '-') === 0; while ((b = b.parentNode) && b.nodeType === 1);return !1; }; }), target(b) { const c = a.location && a.location.hash; return c && c.slice(1) === b.id; }, root(a) { return a === o; }, focus(a) { return a === n.activeElement && (!n.hasFocus || n.hasFocus()) && !!(a.type || a.href || ~a.tabIndex); }, enabled(a) { return a.disabled === !1; }, disabled(a) { return a.disabled === !0; }, checked(a) { const b = a.nodeName.toLowerCase(); return b === 'input' && !!a.checked || b === 'option' && !!a.selected; }, selected(a) { return a.parentNode && a.parentNode.selectedIndex, a.selected === !0; }, empty(a) { for (a = a.firstChild; a; a = a.nextSibling) if (a.nodeType < 6) return !1; return !0; }, parent(a) { return !d.pseudos.empty(a); }, header(a) { return Z.test(a.nodeName); }, input(a) { return Y.test(a.nodeName); }, button(a) { const b = a.nodeName.toLowerCase(); return b === 'input' && a.type === 'button' || b === 'button'; }, text(a) { let b; return a.nodeName.toLowerCase() === 'input' && a.type === 'text' && ((b = a.getAttribute('type')) == null || b.toLowerCase() === 'text'); }, first: nb(function() { return [ 0 ]; }), last: nb(function(a, b) { return [ b - 1 ]; }), eq: nb(function(a, b, c) { return [ c < 0 ? c + b : c ]; }), even: nb(function(a, b) { for (let c = 0; b > c; c += 2)a.push(c); return a; }), odd: nb(function(a, b) { for (let c = 1; b > c; c += 2)a.push(c); return a; }), lt: nb(function(a, b, c) { for (let d = c < 0 ? c + b : c; --d >= 0;)a.push(d); return a; }), gt: nb(function(a, b, c) { for (let d = c < 0 ? c + b : c; ++d < b;)a.push(d); return a; }) } }, d.pseudos.nth = d.pseudos.eq; for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })d.pseudos[b] = lb(b); for (b in { submit: !0, reset: !0 })d.pseudos[b] = mb(b); function pb() {}pb.prototype = d.filters = d.pseudos, d.setFilters = new pb(), g = fb.tokenize = function(a, b) {
      let c,
        e,
        f,
        g,
        h,
        i,
        j,
        k = z[a + ' ']; if (k) return b ? 0 : k.slice(0); h = a, i = [], j = d.preFilter; while (h) { (!c || (e = S.exec(h))) && (e && (h = h.slice(e[0].length) || h), i.push(f = [])), c = !1, (e = T.exec(h)) && (c = e.shift(), f.push({ value: c, type: e[0].replace(R, ' ') }), h = h.slice(c.length)); for (g in d.filter)!(e = X[g].exec(h)) || j[g] && !(e = j[g](e)) || (c = e.shift(), f.push({ value: c, type: g, matches: e }), h = h.slice(c.length)); if (!c) break; } return b ? h.length : h ? fb.error(a) : z(a, i).slice(0);
    }; function qb(a) { for (var b = 0, c = a.length, d = ''; c > b; b++)d += a[b].value; return d; } function rb(a, b, c) {
      const d = b.dir,
        e = c && d === 'parentNode',
        f = x++; return b.first ? function(b, c, f) { while (b = b[d]) if (b.nodeType === 1 || e) return a(b, c, f); } : function(b, c, g) {
        let h,
          i,
          j = [ w, f ]; if (g) { while (b = b[d]) if ((b.nodeType === 1 || e) && a(b, c, g)) return !0; } else while (b = b[d]) if (b.nodeType === 1 || e) { if (i = b[u] || (b[u] = {}), (h = i[d]) && h[0] === w && h[1] === f) return j[2] = h[2]; if (i[d] = j, j[2] = a(b, c, g)) return !0; }
      };
    } function sb(a) { return a.length > 1 ? function(b, c, d) { let e = a.length; while (e--) if (!a[e](b, c, d)) return !1; return !0; } : a[0]; } function tb(a, b, c) { for (let d = 0, e = b.length; e > d; d++)fb(a, b[d], c); return c; } function ub(a, b, c, d, e) { for (var f, g = [], h = 0, i = a.length, j = b != null; i > h; h++)(f = a[h]) && (!c || c(f, d, e)) && (g.push(f), j && b.push(h)); return g; } function vb(a, b, c, d, e, f) {
      return d && !d[u] && (d = vb(d)), e && !e[u] && (e = vb(e, f)), hb(function(f, g, h, i) {
        let j,
          k,
          l,
          m = [],
          n = [],
          o = g.length,
          p = f || tb(b || '*', h.nodeType ? [ h ] : h, []),
          q = !a || !f && b ? p : ub(p, m, a, h, i),
          r = c ? e || (f ? a : o || d) ? [] : g : q; if (c && c(q, r, h, i), d) { j = ub(r, n), d(j, [], h, i), k = j.length; while (k--)(l = j[k]) && (r[n[k]] = !(q[n[k]] = l)); } if (f) { if (e || a) { if (e) { j = [], k = r.length; while (k--)(l = r[k]) && j.push(q[k] = l); e(null, r = [], j, i); }k = r.length; while (k--)(l = r[k]) && (j = e ? K.call(f, l) : m[k]) > -1 && (f[j] = !(g[j] = l)); } } else r = ub(r === g ? r.splice(o, r.length) : r), e ? e(null, g, r, i) : I.apply(g, r);
      });
    } function wb(a) { for (var b, c, e, f = a.length, g = d.relative[a[0].type], h = g || d.relative[' '], i = g ? 1 : 0, k = rb(function(a) { return a === b; }, h, !0), l = rb(function(a) { return K.call(b, a) > -1; }, h, !0), m = [ function(a, c, d) { return !g && (d || c !== j) || ((b = c).nodeType ? k(a, c, d) : l(a, c, d)); } ]; f > i; i++) if (c = d.relative[a[i].type])m = [ rb(sb(m), c) ]; else { if (c = d.filter[a[i].type].apply(null, a[i].matches), c[u]) { for (e = ++i; f > e; e++) if (d.relative[a[e].type]) break; return vb(i > 1 && sb(m), i > 1 && qb(a.slice(0, i - 1).concat({ value: a[i - 2].type === ' ' ? '*' : '' })).replace(R, '$1'), c, e > i && wb(a.slice(i, e)), f > e && wb(a = a.slice(e)), f > e && qb(a)); }m.push(c); } return sb(m); } function xb(a, b) {
      const c = b.length > 0,
        e = a.length > 0,
        f = function(f, g, h, i, k) {
          let l,
            m,
            o,
            p = 0,
            q = '0',
            r = f && [],
            s = [],
            t = j,
            u = f || e && d.find.TAG('*', k),
            v = w += t == null ? 1 : Math.random() || 0.1,
            x = u.length; for (k && (j = g !== n && g); q !== x && (l = u[q]) != null; q++) { if (e && l) { m = 0; while (o = a[m++]) if (o(l, g, h)) { i.push(l); break; }k && (w = v); }c && ((l = !o && l) && p--, f && r.push(l)); } if (p += q, c && q !== p) { m = 0; while (o = b[m++])o(r, s, g, h); if (f) { if (p > 0) while (q--)r[q] || s[q] || (s[q] = G.call(i)); s = ub(s); }I.apply(i, s), k && !f && s.length > 0 && p + b.length > 1 && fb.uniqueSort(i); } return k && (w = v, j = t), r;
        }; return c ? hb(f) : f;
    } return h = fb.compile = function(a, b) {
      let c,
        d = [],
        e = [],
        f = A[a + ' ']; if (!f) { b || (b = g(a)), c = b.length; while (c--)f = wb(b[c]), f[u] ? d.push(f) : e.push(f); f = A(a, xb(e, d)), f.selector = a; } return f;
    }, i = fb.select = function(a, b, e, f) {
      let i,
        j,
        k,
        l,
        m,
        n = typeof a === 'function' && a,
        o = !f && g(a = n.selector || a); if (e = e || [], o.length === 1) { if (j = o[0] = o[0].slice(0), j.length > 2 && (k = j[0]).type === 'ID' && c.getById && b.nodeType === 9 && p && d.relative[j[1].type]) { if (b = (d.find.ID(k.matches[0].replace(cb, db), b) || [])[0], !b) return e; n && (b = b.parentNode), a = a.slice(j.shift().value.length); }i = X.needsContext.test(a) ? 0 : j.length; while (i--) { if (k = j[i], d.relative[l = k.type]) break; if ((m = d.find[l]) && (f = m(k.matches[0].replace(cb, db), ab.test(j[0].type) && ob(b.parentNode) || b))) { if (j.splice(i, 1), a = f.length && qb(j), !a) return I.apply(e, f), e; break; } } } return (n || h(a, o))(f, b, !p, e, ab.test(a) && ob(b.parentNode) || b), e;
    }, c.sortStable = u.split('').sort(B).join('') === u, c.detectDuplicates = !!l, m(), c.sortDetached = ib(function(a) { return 1 & a.compareDocumentPosition(n.createElement('div')); }), ib(function(a) { return a.innerHTML = "<a href='#'></a>", a.firstChild.getAttribute('href') === '#'; }) || jb('type|href|height|width', function(a, b, c) { return c ? void 0 : a.getAttribute(b, b.toLowerCase() === 'type' ? 1 : 2); }), c.attributes && ib(function(a) { return a.innerHTML = '<input/>', a.firstChild.setAttribute('value', ''), a.firstChild.getAttribute('value') === ''; }) || jb('value', function(a, b, c) { return c || a.nodeName.toLowerCase() !== 'input' ? void 0 : a.defaultValue; }), ib(function(a) { return a.getAttribute('disabled') == null; }) || jb(L, function(a, b, c) { let d; return c ? void 0 : a[b] === !0 ? b.toLowerCase() : (d = a.getAttributeNode(b)) && d.specified ? d.value : null; }), fb;
  }(a); m.find = s, m.expr = s.selectors, m.expr[':'] = m.expr.pseudos, m.unique = s.uniqueSort, m.text = s.getText, m.isXMLDoc = s.isXML, m.contains = s.contains; const t = m.expr.match.needsContext,
    u = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    v = /^.[^:#\[\.,]*$/; function w(a, b, c) { if (m.isFunction(b)) return m.grep(a, function(a, d) { return !!b.call(a, d, a) !== c; }); if (b.nodeType) return m.grep(a, function(a) { return a === b !== c; }); if (typeof b === 'string') { if (v.test(b)) return m.filter(b, a, c); b = m.filter(b, a); } return m.grep(a, function(a) { return m.inArray(a, b) >= 0 !== c; }); }m.filter = function(a, b, c) { const d = b[0]; return c && (a = ':not(' + a + ')'), b.length === 1 && d.nodeType === 1 ? m.find.matchesSelector(d, a) ? [ d ] : [] : m.find.matches(a, m.grep(b, function(a) { return a.nodeType === 1; })); }, m.fn.extend({ find(a) {
    let b,
      c = [],
      d = this,
      e = d.length; if (typeof a !== 'string') return this.pushStack(m(a).filter(function() { for (b = 0; e > b; b++) if (m.contains(d[b], this)) return !0; })); for (b = 0; e > b; b++)m.find(a, d[b], c); return c = this.pushStack(e > 1 ? m.unique(c) : c), c.selector = this.selector ? this.selector + ' ' + a : a, c;
  }, filter(a) { return this.pushStack(w(this, a || [], !1)); }, not(a) { return this.pushStack(w(this, a || [], !0)); }, is(a) { return !!w(this, typeof a === 'string' && t.test(a) ? m(a) : a || [], !1).length; } }); let x,
    y = a.document,
    z = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    A = m.fn.init = function(a, b) {
      let c,
        d; if (!a) return this; if (typeof a === 'string') { if (c = a.charAt(0) === '<' && a.charAt(a.length - 1) === '>' && a.length >= 3 ? [ null, a, null ] : z.exec(a), !c || !c[1] && b) return !b || b.jquery ? (b || x).find(a) : this.constructor(b).find(a); if (c[1]) { if (b = b instanceof m ? b[0] : b, m.merge(this, m.parseHTML(c[1], b && b.nodeType ? b.ownerDocument || b : y, !0)), u.test(c[1]) && m.isPlainObject(b)) for (c in b)m.isFunction(this[c]) ? this[c](b[c]) : this.attr(c, b[c]); return this; } if (d = y.getElementById(c[2]), d && d.parentNode) { if (d.id !== c[2]) return x.find(a); this.length = 1, this[0] = d; } return this.context = y, this.selector = a, this; } return a.nodeType ? (this.context = this[0] = a, this.length = 1, this) : m.isFunction(a) ? typeof x.ready !== 'undefined' ? x.ready(a) : a(m) : (void 0 !== a.selector && (this.selector = a.selector, this.context = a.context), m.makeArray(a, this));
    }; A.prototype = m.fn, x = m(y); const B = /^(?:parents|prev(?:Until|All))/,
    C = { children: !0, contents: !0, next: !0, prev: !0 }; m.extend({ dir(a, b, c) {
    let d = [],
      e = a[b]; while (e && e.nodeType !== 9 && (void 0 === c || e.nodeType !== 1 || !m(e).is(c)))e.nodeType === 1 && d.push(e), e = e[b]; return d;
  }, sibling(a, b) { for (var c = []; a; a = a.nextSibling)a.nodeType === 1 && a !== b && c.push(a); return c; } }), m.fn.extend({ has(a) {
    let b,
      c = m(a, this),
      d = c.length; return this.filter(function() { for (b = 0; d > b; b++) if (m.contains(this, c[b])) return !0; });
  }, closest(a, b) { for (var c, d = 0, e = this.length, f = [], g = t.test(a) || typeof a !== 'string' ? m(a, b || this.context) : 0; e > d; d++) for (c = this[d]; c && c !== b; c = c.parentNode) if (c.nodeType < 11 && (g ? g.index(c) > -1 : c.nodeType === 1 && m.find.matchesSelector(c, a))) { f.push(c); break; } return this.pushStack(f.length > 1 ? m.unique(f) : f); }, index(a) { return a ? typeof a === 'string' ? m.inArray(this[0], m(a)) : m.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1; }, add(a, b) { return this.pushStack(m.unique(m.merge(this.get(), m(a, b)))); }, addBack(a) { return this.add(a == null ? this.prevObject : this.prevObject.filter(a)); } }); function D(a, b) { do a = a[b]; while (a && a.nodeType !== 1);return a; }m.each({ parent(a) { const b = a.parentNode; return b && b.nodeType !== 11 ? b : null; }, parents(a) { return m.dir(a, 'parentNode'); }, parentsUntil(a, b, c) { return m.dir(a, 'parentNode', c); }, next(a) { return D(a, 'nextSibling'); }, prev(a) { return D(a, 'previousSibling'); }, nextAll(a) { return m.dir(a, 'nextSibling'); }, prevAll(a) { return m.dir(a, 'previousSibling'); }, nextUntil(a, b, c) { return m.dir(a, 'nextSibling', c); }, prevUntil(a, b, c) { return m.dir(a, 'previousSibling', c); }, siblings(a) { return m.sibling((a.parentNode || {}).firstChild, a); }, children(a) { return m.sibling(a.firstChild); }, contents(a) { return m.nodeName(a, 'iframe') ? a.contentDocument || a.contentWindow.document : m.merge([], a.childNodes); } }, function(a, b) { m.fn[a] = function(c, d) { let e = m.map(this, b, c); return a.slice(-5) !== 'Until' && (d = c), d && typeof d === 'string' && (e = m.filter(d, e)), this.length > 1 && (C[a] || (e = m.unique(e)), B.test(a) && (e = e.reverse())), this.pushStack(e); }; }); const E = /\S+/g,
    F = {}; function G(a) { const b = F[a] = {}; return m.each(a.match(E) || [], function(a, c) { b[c] = !0; }), b; }m.Callbacks = function(a) {
    a = typeof a === 'string' ? F[a] || G(a) : m.extend({}, a); var b,
      c,
      d,
      e,
      f,
      g,
      h = [],
      i = !a.once && [],
      j = function(l) { for (c = a.memory && l, d = !0, f = g || 0, g = 0, e = h.length, b = !0; h && e > f; f++) if (h[f].apply(l[0], l[1]) === !1 && a.stopOnFalse) { c = !1; break; }b = !1, h && (i ? i.length && j(i.shift()) : c ? h = [] : k.disable()); },
      k = { add() { if (h) { const d = h.length; !function f(b) { m.each(b, function(b, c) { const d = m.type(c); d === 'function' ? a.unique && k.has(c) || h.push(c) : c && c.length && d !== 'string' && f(c); }); }(arguments), b ? e = h.length : c && (g = d, j(c)); } return this; }, remove() { return h && m.each(arguments, function(a, c) { let d; while ((d = m.inArray(c, h, d)) > -1)h.splice(d, 1), b && (e >= d && e--, f >= d && f--); }), this; }, has(a) { return a ? m.inArray(a, h) > -1 : !(!h || !h.length); }, empty() { return h = [], e = 0, this; }, disable() { return h = i = c = void 0, this; }, disabled() { return !h; }, lock() { return i = void 0, c || k.disable(), this; }, locked() { return !i; }, fireWith(a, c) { return !h || d && !i || (c = c || [], c = [ a, c.slice ? c.slice() : c ], b ? i.push(c) : j(c)), this; }, fire() { return k.fireWith(this, arguments), this; }, fired() { return !!d; } }; return k;
  }, m.extend({ Deferred(a) {
    var b = [[ 'resolve', 'done', m.Callbacks('once memory'), 'resolved' ], [ 'reject', 'fail', m.Callbacks('once memory'), 'rejected' ], [ 'notify', 'progress', m.Callbacks('memory') ]],
      c = 'pending',
      d = { state() { return c; }, always() { return e.done(arguments).fail(arguments), this; }, then() {
        let a = arguments; return m.Deferred(function(c) {
          m.each(b, function(b, f) {
            const g = m.isFunction(a[b]) && a[b]; e[f[1]](function() {
              const a = g && g.apply(this, arguments); a && m.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject)
                .progress(c.notify) : c[f[0] + 'With'](this === d ? c.promise() : this, g ? [ a ] : arguments);
            });
          }), a = null;
        }).promise();
      }, promise(a) { return a != null ? m.extend(a, d) : d; } },
      e = {}; return d.pipe = d.then, m.each(b, function(a, f) {
      const g = f[2],
        h = f[3]; d[f[1]] = g.add, h && g.add(function() { c = h; }, b[1 ^ a][2].disable, b[2][2].lock), e[f[0]] = function() { return e[f[0] + 'With'](this === e ? d : this, arguments), this; }, e[f[0] + 'With'] = g.fireWith;
    }), d.promise(e), a && a.call(e, e), e;
  }, when(a) {
    let b = 0,
      c = d.call(arguments),
      e = c.length,
      f = e !== 1 || a && m.isFunction(a.promise) ? e : 0,
      g = f === 1 ? a : m.Deferred(),
      h = function(a, b, c) { return function(e) { b[a] = this, c[a] = arguments.length > 1 ? d.call(arguments) : e, c === i ? g.notifyWith(b, c) : --f || g.resolveWith(b, c); }; },
      i,
      j,
      k; if (e > 1) {
      for (i = new Array(e), j = new Array(e), k = new Array(e); e > b; b++) {
        c[b] && m.isFunction(c[b].promise) ? c[b].promise().done(h(b, k, c)).fail(g.reject)
          .progress(h(b, j, i)) : --f;
      }
    } return f || g.resolveWith(k, c), g.promise();
  } }); let H; m.fn.ready = function(a) { return m.ready.promise().done(a), this; }, m.extend({ isReady: !1, readyWait: 1, holdReady(a) { a ? m.readyWait++ : m.ready(!0); }, ready(a) { if (a === !0 ? !--m.readyWait : !m.isReady) { if (!y.body) return setTimeout(m.ready); m.isReady = !0, a !== !0 && --m.readyWait > 0 || (H.resolveWith(y, [ m ]), m.fn.triggerHandler && (m(y).triggerHandler('ready'), m(y).off('ready'))); } } }); function I() { y.addEventListener ? (y.removeEventListener('DOMContentLoaded', J, !1), a.removeEventListener('load', J, !1)) : (y.detachEvent('onreadystatechange', J), a.detachEvent('onload', J)); } function J() { (y.addEventListener || event.type === 'load' || y.readyState === 'complete') && (I(), m.ready()); }m.ready.promise = function(b) { if (!H) if (H = m.Deferred(), y.readyState === 'complete')setTimeout(m.ready); else if (y.addEventListener)y.addEventListener('DOMContentLoaded', J, !1), a.addEventListener('load', J, !1); else { y.attachEvent('onreadystatechange', J), a.attachEvent('onload', J); let c = !1; try { c = a.frameElement == null && y.documentElement; } catch (d) {}c && c.doScroll && !function e() { if (!m.isReady) { try { c.doScroll('left'); } catch (a) { return setTimeout(e, 50); }I(), m.ready(); } }(); } return H.promise(b); }; let K = 'undefined',
    L; for (L in m(k)) break; k.ownLast = L !== '0', k.inlineBlockNeedsLayout = !1, m(function() {
    let a,
      b,
      c,
      d; c = y.getElementsByTagName('body')[0], c && c.style && (b = y.createElement('div'), d = y.createElement('div'), d.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px', c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = 'display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1', k.inlineBlockNeedsLayout = a = b.offsetWidth === 3, a && (c.style.zoom = 1)), c.removeChild(d));
  }), function() { let a = y.createElement('div'); if (k.deleteExpando == null) { k.deleteExpando = !0; try { delete a.test; } catch (b) { k.deleteExpando = !1; } }a = null; }(), m.acceptData = function(a) {
    const b = m.noData[(a.nodeName + ' ').toLowerCase()],
      c = +a.nodeType || 1; return c !== 1 && c !== 9 ? !1 : !b || b !== !0 && a.getAttribute('classid') === b;
  }; const M = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    N = /([A-Z])/g; function O(a, b, c) { if (void 0 === c && a.nodeType === 1) { const d = 'data-' + b.replace(N, '-$1').toLowerCase(); if (c = a.getAttribute(d), typeof c === 'string') { try { c = c === 'true' ? !0 : c === 'false' ? !1 : c === 'null' ? null : +c + '' === c ? +c : M.test(c) ? m.parseJSON(c) : c; } catch (e) {}m.data(a, b, c); } else c = void 0; } return c; } function P(a) { let b; for (b in a) if ((b !== 'data' || !m.isEmptyObject(a[b])) && b !== 'toJSON') return !1; return !0; } function Q(a, b, d, e) {
    if (m.acceptData(a)) {
      let f,
        g,
        h = m.expando,
        i = a.nodeType,
        j = i ? m.cache : a,
        k = i ? a[h] : a[h] && h;
      if (k && j[k] && (e || j[k].data) || void 0 !== d || typeof b !== 'string') return k || (k = i ? a[h] = c.pop() || m.guid++ : h), j[k] || (j[k] = i ? {} : { toJSON: m.noop }), (typeof b === 'object' || typeof b === 'function') && (e ? j[k] = m.extend(j[k], b) : j[k].data = m.extend(j[k].data, b)), g = j[k], e || (g.data || (g.data = {}), g = g.data), void 0 !== d && (g[m.camelCase(b)] = d), typeof b === 'string' ? (f = g[b], f == null && (f = g[m.camelCase(b)])) : f = g, f;
    }
  } function R(a, b, c) {
    if (m.acceptData(a)) {
      let d,
        e,
        f = a.nodeType,
        g = f ? m.cache : a,
        h = f ? a[m.expando] : m.expando; if (g[h]) { if (b && (d = c ? g[h] : g[h].data)) { m.isArray(b) ? b = b.concat(m.map(b, m.camelCase)) : b in d ? b = [ b ] : (b = m.camelCase(b), b = b in d ? [ b ] : b.split(' ')), e = b.length; while (e--) delete d[b[e]]; if (c ? !P(d) : !m.isEmptyObject(d)) return; }(c || (delete g[h].data, P(g[h]))) && (f ? m.cleanData([ a ], !0) : k.deleteExpando || g != g.window ? delete g[h] : g[h] = null); }
    }
  }m.extend({ cache: {}, noData: { 'applet ': !0, 'embed ': !0, 'object ': 'clsid:D27CDB6E-AE6D-11cf-96B8-444553540000' }, hasData(a) { return a = a.nodeType ? m.cache[a[m.expando]] : a[m.expando], !!a && !P(a); }, data(a, b, c) { return Q(a, b, c); }, removeData(a, b) { return R(a, b); }, _data(a, b, c) { return Q(a, b, c, !0); }, _removeData(a, b) { return R(a, b, !0); } }), m.fn.extend({ data(a, b) {
    let c,
      d,
      e,
      f = this[0],
      g = f && f.attributes; if (void 0 === a) { if (this.length && (e = m.data(f), f.nodeType === 1 && !m._data(f, 'parsedAttrs'))) { c = g.length; while (c--)g[c] && (d = g[c].name, d.indexOf('data-') === 0 && (d = m.camelCase(d.slice(5)), O(f, d, e[d]))); m._data(f, 'parsedAttrs', !0); } return e; } return typeof a === 'object' ? this.each(function() { m.data(this, a); }) : arguments.length > 1 ? this.each(function() { m.data(this, a, b); }) : f ? O(f, a, m.data(f, a)) : void 0;
  }, removeData(a) { return this.each(function() { m.removeData(this, a); }); } }), m.extend({ queue(a, b, c) { let d; return a ? (b = (b || 'fx') + 'queue', d = m._data(a, b), c && (!d || m.isArray(c) ? d = m._data(a, b, m.makeArray(c)) : d.push(c)), d || []) : void 0; }, dequeue(a, b) {
    b = b || 'fx'; let c = m.queue(a, b),
      d = c.length,
      e = c.shift(),
      f = m._queueHooks(a, b),
      g = function() { m.dequeue(a, b); }; e === 'inprogress' && (e = c.shift(), d--), e && (b === 'fx' && c.unshift('inprogress'), delete f.stop, e.call(a, g, f)), !d && f && f.empty.fire();
  }, _queueHooks(a, b) { const c = b + 'queueHooks'; return m._data(a, c) || m._data(a, c, { empty: m.Callbacks('once memory').add(function() { m._removeData(a, b + 'queue'), m._removeData(a, c); }) }); } }), m.fn.extend({ queue(a, b) { let c = 2; return typeof a !== 'string' && (b = a, a = 'fx', c--), arguments.length < c ? m.queue(this[0], a) : void 0 === b ? this : this.each(function() { const c = m.queue(this, a, b); m._queueHooks(this, a), a === 'fx' && c[0] !== 'inprogress' && m.dequeue(this, a); }); }, dequeue(a) { return this.each(function() { m.dequeue(this, a); }); }, clearQueue(a) { return this.queue(a || 'fx', []); }, promise(a, b) {
    let c,
      d = 1,
      e = m.Deferred(),
      f = this,
      g = this.length,
      h = function() { --d || e.resolveWith(f, [ f ]); }; typeof a !== 'string' && (b = a, a = void 0), a = a || 'fx'; while (g--)c = m._data(f[g], a + 'queueHooks'), c && c.empty && (d++, c.empty.add(h)); return h(), e.promise(b);
  } }); const S = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    T = [ 'Top', 'Right', 'Bottom', 'Left' ],
    U = function(a, b) { return a = b || a, m.css(a, 'display') === 'none' || !m.contains(a.ownerDocument, a); },
    V = m.access = function(a, b, c, d, e, f, g) {
      let h = 0,
        i = a.length,
        j = c == null; if (m.type(c) === 'object') { e = !0; for (h in c)m.access(a, b, h, c[h], !0, f, g); } else if (void 0 !== d && (e = !0, m.isFunction(d) || (g = !0), j && (g ? (b.call(a, d), b = null) : (j = b, b = function(a, b, c) { return j.call(m(a), c); })), b)) for (;i > h; h++)b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c))); return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
    },
    W = /^(?:checkbox|radio)$/i; !function() {
    const a = y.createElement('input'),
      b = y.createElement('div'),
      c = y.createDocumentFragment(); if (b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", k.leadingWhitespace = b.firstChild.nodeType === 3, k.tbody = !b.getElementsByTagName('tbody').length, k.htmlSerialize = !!b.getElementsByTagName('link').length, k.html5Clone = y.createElement('nav').cloneNode(!0).outerHTML !== '<:nav></:nav>', a.type = 'checkbox', a.checked = !0, c.appendChild(a), k.appendChecked = a.checked, b.innerHTML = '<textarea>x</textarea>', k.noCloneChecked = !!b.cloneNode(!0).lastChild.defaultValue, c.appendChild(b), b.innerHTML = "<input type='radio' checked='checked' name='t'/>", k.checkClone = b.cloneNode(!0).cloneNode(!0).lastChild.checked, k.noCloneEvent = !0, b.attachEvent && (b.attachEvent('onclick', function() { k.noCloneEvent = !1; }), b.cloneNode(!0).click()), k.deleteExpando == null) { k.deleteExpando = !0; try { delete b.test; } catch (d) { k.deleteExpando = !1; } }
  }(), function() {
    let b,
      c,
      d = y.createElement('div'); for (b in { submit: !0, change: !0, focusin: !0 })c = 'on' + b, (k[b + 'Bubbles'] = c in a) || (d.setAttribute(c, 't'), k[b + 'Bubbles'] = d.attributes[c].expando === !1); d = null;
  }(); const X = /^(?:input|select|textarea)$/i,
    Y = /^key/,
    Z = /^(?:mouse|pointer|contextmenu)|click/,
    $ = /^(?:focusinfocus|focusoutblur)$/,
    _ = /^([^.]*)(?:\.(.+)|)$/; function ab() { return !0; } function bb() { return !1; } function cb() { try { return y.activeElement; } catch (a) {} }m.event = { global: {}, add(a, b, c, d, e) {
    let f,
      g,
      h,
      i,
      j,
      k,
      l,
      n,
      o,
      p,
      q,
      r = m._data(a); if (r) { c.handler && (i = c, c = i.handler, e = i.selector), c.guid || (c.guid = m.guid++), (g = r.events) || (g = r.events = {}), (k = r.handle) || (k = r.handle = function(a) { return typeof m === K || a && m.event.triggered === a.type ? void 0 : m.event.dispatch.apply(k.elem, arguments); }, k.elem = a), b = (b || '').match(E) || [ '' ], h = b.length; while (h--)f = _.exec(b[h]) || [], o = q = f[1], p = (f[2] || '').split('.').sort(), o && (j = m.event.special[o] || {}, o = (e ? j.delegateType : j.bindType) || o, j = m.event.special[o] || {}, l = m.extend({ type: o, origType: q, data: d, handler: c, guid: c.guid, selector: e, needsContext: e && m.expr.match.needsContext.test(e), namespace: p.join('.') }, i), (n = g[o]) || (n = g[o] = [], n.delegateCount = 0, j.setup && j.setup.call(a, d, p, k) !== !1 || (a.addEventListener ? a.addEventListener(o, k, !1) : a.attachEvent && a.attachEvent('on' + o, k))), j.add && (j.add.call(a, l), l.handler.guid || (l.handler.guid = c.guid)), e ? n.splice(n.delegateCount++, 0, l) : n.push(l), m.event.global[o] = !0); a = null; }
  }, remove(a, b, c, d, e) {
    let f,
      g,
      h,
      i,
      j,
      k,
      l,
      n,
      o,
      p,
      q,
      r = m.hasData(a) && m._data(a); if (r && (k = r.events)) { b = (b || '').match(E) || [ '' ], j = b.length; while (j--) if (h = _.exec(b[j]) || [], o = q = h[1], p = (h[2] || '').split('.').sort(), o) { l = m.event.special[o] || {}, o = (d ? l.delegateType : l.bindType) || o, n = k[o] || [], h = h[2] && new RegExp('(^|\\.)' + p.join('\\.(?:.*\\.|)') + '(\\.|$)'), i = f = n.length; while (f--)g = n[f], !e && q !== g.origType || c && c.guid !== g.guid || h && !h.test(g.namespace) || d && d !== g.selector && (d !== '**' || !g.selector) || (n.splice(f, 1), g.selector && n.delegateCount--, l.remove && l.remove.call(a, g)); i && !n.length && (l.teardown && l.teardown.call(a, p, r.handle) !== !1 || m.removeEvent(a, o, r.handle), delete k[o]); } else for (o in k)m.event.remove(a, o + b[j], c, d, !0); m.isEmptyObject(k) && (delete r.handle, m._removeData(a, 'events')); }
  }, trigger(b, c, d, e) {
    let f,
      g,
      h,
      i,
      k,
      l,
      n,
      o = [ d || y ],
      p = j.call(b, 'type') ? b.type : b,
      q = j.call(b, 'namespace') ? b.namespace.split('.') : []; if (h = l = d = d || y, d.nodeType !== 3 && d.nodeType !== 8 && !$.test(p + m.event.triggered) && (p.indexOf('.') >= 0 && (q = p.split('.'), p = q.shift(), q.sort()), g = p.indexOf(':') < 0 && 'on' + p, b = b[m.expando] ? b : new m.Event(p, typeof b === 'object' && b), b.isTrigger = e ? 2 : 3, b.namespace = q.join('.'), b.namespace_re = b.namespace ? new RegExp('(^|\\.)' + q.join('\\.(?:.*\\.|)') + '(\\.|$)') : null, b.result = void 0, b.target || (b.target = d), c = c == null ? [ b ] : m.makeArray(c, [ b ]), k = m.event.special[p] || {}, e || !k.trigger || k.trigger.apply(d, c) !== !1)) { if (!e && !k.noBubble && !m.isWindow(d)) { for (i = k.delegateType || p, $.test(i + p) || (h = h.parentNode); h; h = h.parentNode)o.push(h), l = h; l === (d.ownerDocument || y) && o.push(l.defaultView || l.parentWindow || a); }n = 0; while ((h = o[n++]) && !b.isPropagationStopped())b.type = n > 1 ? i : k.bindType || p, f = (m._data(h, 'events') || {})[b.type] && m._data(h, 'handle'), f && f.apply(h, c), f = g && h[g], f && f.apply && m.acceptData(h) && (b.result = f.apply(h, c), b.result === !1 && b.preventDefault()); if (b.type = p, !e && !b.isDefaultPrevented() && (!k._default || k._default.apply(o.pop(), c) === !1) && m.acceptData(d) && g && d[p] && !m.isWindow(d)) { l = d[g], l && (d[g] = null), m.event.triggered = p; try { d[p](); } catch (r) {}m.event.triggered = void 0, l && (d[g] = l); } return b.result; }
  }, dispatch(a) {
    a = m.event.fix(a); let b,
      c,
      e,
      f,
      g,
      h = [],
      i = d.call(arguments),
      j = (m._data(this, 'events') || {})[a.type] || [],
      k = m.event.special[a.type] || {}; if (i[0] = a, a.delegateTarget = this, !k.preDispatch || k.preDispatch.call(this, a) !== !1) { h = m.event.handlers.call(this, a, j), b = 0; while ((f = h[b++]) && !a.isPropagationStopped()) { a.currentTarget = f.elem, g = 0; while ((e = f.handlers[g++]) && !a.isImmediatePropagationStopped())(!a.namespace_re || a.namespace_re.test(e.namespace)) && (a.handleObj = e, a.data = e.data, c = ((m.event.special[e.origType] || {}).handle || e.handler).apply(f.elem, i), void 0 !== c && (a.result = c) === !1 && (a.preventDefault(), a.stopPropagation())); } return k.postDispatch && k.postDispatch.call(this, a), a.result; }
  }, handlers(a, b) {
    let c,
      d,
      e,
      f,
      g = [],
      h = b.delegateCount,
      i = a.target; if (h && i.nodeType && (!a.button || a.type !== 'click')) for (;i != this; i = i.parentNode || this) if (i.nodeType === 1 && (i.disabled !== !0 || a.type !== 'click')) { for (e = [], f = 0; h > f; f++)d = b[f], c = d.selector + ' ', void 0 === e[c] && (e[c] = d.needsContext ? m(c, this).index(i) >= 0 : m.find(c, this, null, [ i ]).length), e[c] && e.push(d); e.length && g.push({ elem: i, handlers: e }); } return h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g;
  }, fix(a) {
    if (a[m.expando]) return a; let b,
      c,
      d,
      e = a.type,
      f = a,
      g = this.fixHooks[e]; g || (this.fixHooks[e] = g = Z.test(e) ? this.mouseHooks : Y.test(e) ? this.keyHooks : {}), d = g.props ? this.props.concat(g.props) : this.props, a = new m.Event(f), b = d.length; while (b--)c = d[b], a[c] = f[c]; return a.target || (a.target = f.srcElement || y), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, g.filter ? g.filter(a, f) : a;
  }, props: 'altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which'.split(' '), fixHooks: {}, keyHooks: { props: 'char charCode key keyCode'.split(' '), filter(a, b) { return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a; } }, mouseHooks: { props: 'button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement'.split(' '), filter(a, b) {
    let c,
      d,
      e,
      f = b.button,
      g = b.fromElement; return a.pageX == null && b.clientX != null && (d = a.target.ownerDocument || y, e = d.documentElement, c = d.body, a.pageX = b.clientX + (e && e.scrollLeft || c && c.scrollLeft || 0) - (e && e.clientLeft || c && c.clientLeft || 0), a.pageY = b.clientY + (e && e.scrollTop || c && c.scrollTop || 0) - (e && e.clientTop || c && c.clientTop || 0)), !a.relatedTarget && g && (a.relatedTarget = g === a.target ? b.toElement : g), a.which || void 0 === f || (a.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0), a;
  } }, special: { load: { noBubble: !0 }, focus: { trigger() { if (this !== cb() && this.focus) try { return this.focus(), !1; } catch (a) {} }, delegateType: 'focusin' }, blur: { trigger() { return this === cb() && this.blur ? (this.blur(), !1) : void 0; }, delegateType: 'focusout' }, click: { trigger() { return m.nodeName(this, 'input') && this.type === 'checkbox' && this.click ? (this.click(), !1) : void 0; }, _default(a) { return m.nodeName(a.target, 'a'); } }, beforeunload: { postDispatch(a) { void 0 !== a.result && a.originalEvent && (a.originalEvent.returnValue = a.result); } } }, simulate(a, b, c, d) { const e = m.extend(new m.Event(), c, { type: a, isSimulated: !0, originalEvent: {} }); d ? m.event.trigger(e, null, b) : m.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault(); } }, m.removeEvent = y.removeEventListener ? function(a, b, c) { a.removeEventListener && a.removeEventListener(b, c, !1); } : function(a, b, c) { const d = 'on' + b; a.detachEvent && (typeof a[d] === K && (a[d] = null), a.detachEvent(d, c)); }, m.Event = function(a, b) { return this instanceof m.Event ? (a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || void 0 === a.defaultPrevented && a.returnValue === !1 ? ab : bb) : this.type = a, b && m.extend(this, b), this.timeStamp = a && a.timeStamp || m.now(), void (this[m.expando] = !0)) : new m.Event(a, b); }, m.Event.prototype = { isDefaultPrevented: bb, isPropagationStopped: bb, isImmediatePropagationStopped: bb, preventDefault() { const a = this.originalEvent; this.isDefaultPrevented = ab, a && (a.preventDefault ? a.preventDefault() : a.returnValue = !1); }, stopPropagation() { const a = this.originalEvent; this.isPropagationStopped = ab, a && (a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0); }, stopImmediatePropagation() { const a = this.originalEvent; this.isImmediatePropagationStopped = ab, a && a.stopImmediatePropagation && a.stopImmediatePropagation(), this.stopPropagation(); } }, m.each({ mouseenter: 'mouseover', mouseleave: 'mouseout', pointerenter: 'pointerover', pointerleave: 'pointerout' }, function(a, b) {
    m.event.special[a] = { delegateType: b, bindType: b, handle(a) {
      let c,
        d = this,
        e = a.relatedTarget,
        f = a.handleObj; return (!e || e !== d && !m.contains(d, e)) && (a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b), c;
    } };
  }), k.submitBubbles || (m.event.special.submit = { setup() {
    return m.nodeName(this, 'form') ? !1 : void m.event.add(this, 'click._submit keypress._submit', function(a) {
      const b = a.target,
        c = m.nodeName(b, 'input') || m.nodeName(b, 'button') ? b.form : void 0; c && !m._data(c, 'submitBubbles') && (m.event.add(c, 'submit._submit', function(a) { a._submit_bubble = !0; }), m._data(c, 'submitBubbles', !0));
    });
  }, postDispatch(a) { a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && m.event.simulate('submit', this.parentNode, a, !0)); }, teardown() { return m.nodeName(this, 'form') ? !1 : void m.event.remove(this, '._submit'); } }), k.changeBubbles || (m.event.special.change = { setup() { return X.test(this.nodeName) ? ((this.type === 'checkbox' || this.type === 'radio') && (m.event.add(this, 'propertychange._change', function(a) { a.originalEvent.propertyName === 'checked' && (this._just_changed = !0); }), m.event.add(this, 'click._change', function(a) { this._just_changed && !a.isTrigger && (this._just_changed = !1), m.event.simulate('change', this, a, !0); })), !1) : void m.event.add(this, 'beforeactivate._change', function(a) { const b = a.target; X.test(b.nodeName) && !m._data(b, 'changeBubbles') && (m.event.add(b, 'change._change', function(a) { !this.parentNode || a.isSimulated || a.isTrigger || m.event.simulate('change', this.parentNode, a, !0); }), m._data(b, 'changeBubbles', !0)); }); }, handle(a) { const b = a.target; return this !== b || a.isSimulated || a.isTrigger || b.type !== 'radio' && b.type !== 'checkbox' ? a.handleObj.handler.apply(this, arguments) : void 0; }, teardown() { return m.event.remove(this, '._change'), !X.test(this.nodeName); } }), k.focusinBubbles || m.each({ focus: 'focusin', blur: 'focusout' }, function(a, b) {
    const c = function(a) { m.event.simulate(b, a.target, m.event.fix(a), !0); }; m.event.special[b] = { setup() {
      const d = this.ownerDocument || this,
        e = m._data(d, b); e || d.addEventListener(a, c, !0), m._data(d, b, (e || 0) + 1);
    }, teardown() {
      const d = this.ownerDocument || this,
        e = m._data(d, b) - 1; e ? m._data(d, b, e) : (d.removeEventListener(a, c, !0), m._removeData(d, b));
    } };
  }), m.fn.extend({ on(a, b, c, d, e) {
    let f,
      g; if (typeof a === 'object') { typeof b !== 'string' && (c = c || b, b = void 0); for (f in a) this.on(f, b, c, a[f], e); return this; } if (c == null && d == null ? (d = b, c = b = void 0) : d == null && (typeof b === 'string' ? (d = c, c = void 0) : (d = c, c = b, b = void 0)), d === !1)d = bb; else if (!d) return this; return e === 1 && (g = d, d = function(a) { return m().off(a), g.apply(this, arguments); }, d.guid = g.guid || (g.guid = m.guid++)), this.each(function() { m.event.add(this, a, d, c, b); });
  }, one(a, b, c, d) { return this.on(a, b, c, d, 1); }, off(a, b, c) {
    let d,
      e; if (a && a.preventDefault && a.handleObj) return d = a.handleObj, m(a.delegateTarget).off(d.namespace ? d.origType + '.' + d.namespace : d.origType, d.selector, d.handler), this; if (typeof a === 'object') { for (e in a) this.off(e, b, a[e]); return this; } return (b === !1 || typeof b === 'function') && (c = b, b = void 0), c === !1 && (c = bb), this.each(function() { m.event.remove(this, a, c, b); });
  }, trigger(a, b) { return this.each(function() { m.event.trigger(a, b, this); }); }, triggerHandler(a, b) { const c = this[0]; return c ? m.event.trigger(a, b, c, !0) : void 0; } }); function db(a) {
    const b = eb.split('|'),
      c = a.createDocumentFragment(); if (c.createElement) while (b.length)c.createElement(b.pop()); return c;
  } var eb = 'abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video',
    fb = / jQuery\d+="(?:null|\d+)"/g,
    gb = new RegExp('<(?:' + eb + ')[\\s/>]', 'i'),
    hb = /^\s+/,
    ib = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    jb = /<([\w:]+)/,
    kb = /<tbody/i,
    lb = /<|&#?\w+;/,
    mb = /<(?:script|style|link)/i,
    nb = /checked\s*(?:[^=]|=\s*.checked.)/i,
    ob = /^$|\/(?:java|ecma)script/i,
    pb = /^true\/(.*)/,
    qb = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    rb = { option: [ 1, "<select multiple='multiple'>", '</select>' ], legend: [ 1, '<fieldset>', '</fieldset>' ], area: [ 1, '<map>', '</map>' ], param: [ 1, '<object>', '</object>' ], thead: [ 1, '<table>', '</table>' ], tr: [ 2, '<table><tbody>', '</tbody></table>' ], col: [ 2, '<table><tbody></tbody><colgroup>', '</colgroup></table>' ], td: [ 3, '<table><tbody><tr>', '</tr></tbody></table>' ], _default: k.htmlSerialize ? [ 0, '', '' ] : [ 1, 'X<div>', '</div>' ] },
    sb = db(y),
    tb = sb.appendChild(y.createElement('div')); rb.optgroup = rb.option, rb.tbody = rb.tfoot = rb.colgroup = rb.caption = rb.thead, rb.th = rb.td; function ub(a, b) {
    let c,
      d,
      e = 0,
      f = typeof a.getElementsByTagName !== K ? a.getElementsByTagName(b || '*') : typeof a.querySelectorAll !== K ? a.querySelectorAll(b || '*') : void 0; if (!f) for (f = [], c = a.childNodes || a; (d = c[e]) != null; e++)!b || m.nodeName(d, b) ? f.push(d) : m.merge(f, ub(d, b)); return void 0 === b || b && m.nodeName(a, b) ? m.merge([ a ], f) : f;
  } function vb(a) { W.test(a.type) && (a.defaultChecked = a.checked); } function wb(a, b) { return m.nodeName(a, 'table') && m.nodeName(b.nodeType !== 11 ? b : b.firstChild, 'tr') ? a.getElementsByTagName('tbody')[0] || a.appendChild(a.ownerDocument.createElement('tbody')) : a; } function xb(a) { return a.type = (m.find.attr(a, 'type') !== null) + '/' + a.type, a; } function yb(a) { const b = pb.exec(a.type); return b ? a.type = b[1] : a.removeAttribute('type'), a; } function zb(a, b) { for (var c, d = 0; (c = a[d]) != null; d++)m._data(c, 'globalEval', !b || m._data(b[d], 'globalEval')); } function Ab(a, b) {
    if (b.nodeType === 1 && m.hasData(a)) {
      let c,
        d,
        e,
        f = m._data(a),
        g = m._data(b, f),
        h = f.events; if (h) { delete g.handle, g.events = {}; for (c in h) for (d = 0, e = h[c].length; e > d; d++)m.event.add(b, c, h[c][d]); }g.data && (g.data = m.extend({}, g.data));
    }
  } function Bb(a, b) {
    let c,
      d,
      e; if (b.nodeType === 1) { if (c = b.nodeName.toLowerCase(), !k.noCloneEvent && b[m.expando]) { e = m._data(b); for (d in e.events)m.removeEvent(b, d, e.handle); b.removeAttribute(m.expando); }c === 'script' && b.text !== a.text ? (xb(b).text = a.text, yb(b)) : c === 'object' ? (b.parentNode && (b.outerHTML = a.outerHTML), k.html5Clone && a.innerHTML && !m.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : c === 'input' && W.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : c === 'option' ? b.defaultSelected = b.selected = a.defaultSelected : (c === 'input' || c === 'textarea') && (b.defaultValue = a.defaultValue); }
  }m.extend({ clone(a, b, c) {
    let d,
      e,
      f,
      g,
      h,
      i = m.contains(a.ownerDocument, a); if (k.html5Clone || m.isXMLDoc(a) || !gb.test('<' + a.nodeName + '>') ? f = a.cloneNode(!0) : (tb.innerHTML = a.outerHTML, tb.removeChild(f = tb.firstChild)), !(k.noCloneEvent && k.noCloneChecked || a.nodeType !== 1 && a.nodeType !== 11 || m.isXMLDoc(a))) for (d = ub(f), h = ub(a), g = 0; (e = h[g]) != null; ++g)d[g] && Bb(e, d[g]); if (b) if (c) for (h = h || ub(a), d = d || ub(f), g = 0; (e = h[g]) != null; g++)Ab(e, d[g]); else Ab(a, f); return d = ub(f, 'script'), d.length > 0 && zb(d, !i && ub(a, 'script')), d = h = e = null, f;
  }, buildFragment(a, b, c, d) { for (var e, f, g, h, i, j, l, n = a.length, o = db(b), p = [], q = 0; n > q; q++) if (f = a[q], f || f === 0) if (m.type(f) === 'object')m.merge(p, f.nodeType ? [ f ] : f); else if (lb.test(f)) { h = h || o.appendChild(b.createElement('div')), i = (jb.exec(f) || [ '', '' ])[1].toLowerCase(), l = rb[i] || rb._default, h.innerHTML = l[1] + f.replace(ib, '<$1></$2>') + l[2], e = l[0]; while (e--)h = h.lastChild; if (!k.leadingWhitespace && hb.test(f) && p.push(b.createTextNode(hb.exec(f)[0])), !k.tbody) { f = i !== 'table' || kb.test(f) ? l[1] !== '<table>' || kb.test(f) ? 0 : h : h.firstChild, e = f && f.childNodes.length; while (e--)m.nodeName(j = f.childNodes[e], 'tbody') && !j.childNodes.length && f.removeChild(j); }m.merge(p, h.childNodes), h.textContent = ''; while (h.firstChild)h.removeChild(h.firstChild); h = o.lastChild; } else p.push(b.createTextNode(f)); h && o.removeChild(h), k.appendChecked || m.grep(ub(p, 'input'), vb), q = 0; while (f = p[q++]) if ((!d || m.inArray(f, d) === -1) && (g = m.contains(f.ownerDocument, f), h = ub(o.appendChild(f), 'script'), g && zb(h), c)) { e = 0; while (f = h[e++])ob.test(f.type || '') && c.push(f); } return h = null, o; }, cleanData(a, b) { for (var d, e, f, g, h = 0, i = m.expando, j = m.cache, l = k.deleteExpando, n = m.event.special; (d = a[h]) != null; h++) if ((b || m.acceptData(d)) && (f = d[i], g = f && j[f])) { if (g.events) for (e in g.events)n[e] ? m.event.remove(d, e) : m.removeEvent(d, e, g.handle); j[f] && (delete j[f], l ? delete d[i] : typeof d.removeAttribute !== K ? d.removeAttribute(i) : d[i] = null, c.push(f)); } } }), m.fn.extend({ text(a) { return V(this, function(a) { return void 0 === a ? m.text(this) : this.empty().append((this[0] && this[0].ownerDocument || y).createTextNode(a)); }, null, a, arguments.length); }, append() { return this.domManip(arguments, function(a) { if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) { const b = wb(this, a); b.appendChild(a); } }); }, prepend() { return this.domManip(arguments, function(a) { if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) { const b = wb(this, a); b.insertBefore(a, b.firstChild); } }); }, before() { return this.domManip(arguments, function(a) { this.parentNode && this.parentNode.insertBefore(a, this); }); }, after() { return this.domManip(arguments, function(a) { this.parentNode && this.parentNode.insertBefore(a, this.nextSibling); }); }, remove(a, b) { for (var c, d = a ? m.filter(a, this) : this, e = 0; (c = d[e]) != null; e++)b || c.nodeType !== 1 || m.cleanData(ub(c)), c.parentNode && (b && m.contains(c.ownerDocument, c) && zb(ub(c, 'script')), c.parentNode.removeChild(c)); return this; }, empty() { for (var a, b = 0; (a = this[b]) != null; b++) { a.nodeType === 1 && m.cleanData(ub(a, !1)); while (a.firstChild)a.removeChild(a.firstChild); a.options && m.nodeName(a, 'select') && (a.options.length = 0); } return this; }, clone(a, b) { return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() { return m.clone(this, a, b); }); }, html(a) {
    return V(this, function(a) {
      let b = this[0] || {},
        c = 0,
        d = this.length; if (void 0 === a) return b.nodeType === 1 ? b.innerHTML.replace(fb, '') : void 0; if (!(typeof a !== 'string' || mb.test(a) || !k.htmlSerialize && gb.test(a) || !k.leadingWhitespace && hb.test(a) || rb[(jb.exec(a) || [ '', '' ])[1].toLowerCase()])) { a = a.replace(ib, '<$1></$2>'); try { for (;d > c; c++)b = this[c] || {}, b.nodeType === 1 && (m.cleanData(ub(b, !1)), b.innerHTML = a); b = 0; } catch (e) {} }b && this.empty().append(a);
    }, null, a, arguments.length);
  }, replaceWith() { let a = arguments[0]; return this.domManip(arguments, function(b) { a = this.parentNode, m.cleanData(ub(this)), a && a.replaceChild(b, this); }), a && (a.length || a.nodeType) ? this : this.remove(); }, detach(a) { return this.remove(a, !0); }, domManip(a, b) {
    a = e.apply([], a); let c,
      d,
      f,
      g,
      h,
      i,
      j = 0,
      l = this.length,
      n = this,
      o = l - 1,
      p = a[0],
      q = m.isFunction(p); if (q || l > 1 && typeof p === 'string' && !k.checkClone && nb.test(p)) return this.each(function(c) { const d = n.eq(c); q && (a[0] = p.call(this, c, d.html())), d.domManip(a, b); }); if (l && (i = m.buildFragment(a, this[0].ownerDocument, !1, this), c = i.firstChild, i.childNodes.length === 1 && (i = c), c)) { for (g = m.map(ub(i, 'script'), xb), f = g.length; l > j; j++)d = i, j !== o && (d = m.clone(d, !0, !0), f && m.merge(g, ub(d, 'script'))), b.call(this[j], d, j); if (f) for (h = g[g.length - 1].ownerDocument, m.map(g, yb), j = 0; f > j; j++)d = g[j], ob.test(d.type || '') && !m._data(d, 'globalEval') && m.contains(h, d) && (d.src ? m._evalUrl && m._evalUrl(d.src) : m.globalEval((d.text || d.textContent || d.innerHTML || '').replace(qb, ''))); i = c = null; } return this;
  } }), m.each({ appendTo: 'append', prependTo: 'prepend', insertBefore: 'before', insertAfter: 'after', replaceAll: 'replaceWith' }, function(a, b) { m.fn[a] = function(a) { for (var c, d = 0, e = [], g = m(a), h = g.length - 1; h >= d; d++)c = d === h ? this : this.clone(!0), m(g[d])[b](c), f.apply(e, c.get()); return this.pushStack(e); }; }); let Cb,
    Db = {}; function Eb(b, c) {
    let d,
      e = m(c.createElement(b)).appendTo(c.body),
      f = a.getDefaultComputedStyle && (d = a.getDefaultComputedStyle(e[0])) ? d.display : m.css(e[0], 'display'); return e.detach(), f;
  } function Fb(a) {
    let b = y,
      c = Db[a]; return c || (c = Eb(a, b), c !== 'none' && c || (Cb = (Cb || m("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement), b = (Cb[0].contentWindow || Cb[0].contentDocument).document, b.write(), b.close(), c = Eb(a, b), Cb.detach()), Db[a] = c), c;
  }!function() {
    let a; k.shrinkWrapBlocks = function() {
      if (a != null) return a; a = !1; let b,
        c,
        d; return c = y.getElementsByTagName('body')[0], c && c.style ? (b = y.createElement('div'), d = y.createElement('div'), d.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px', c.appendChild(d).appendChild(b), typeof b.style.zoom !== K && (b.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1', b.appendChild(y.createElement('div')).style.width = '5px', a = b.offsetWidth !== 3), c.removeChild(d), a) : void 0;
    };
  }(); let Gb = /^margin/,
    Hb = new RegExp('^(' + S + ')(?!px)[a-z%]+$', 'i'),
    Ib,
    Jb,
    Kb = /^(top|right|bottom|left)$/; a.getComputedStyle ? (Ib = function(a) { return a.ownerDocument.defaultView.getComputedStyle(a, null); }, Jb = function(a, b, c) {
    let d,
      e,
      f,
      g,
      h = a.style; return c = c || Ib(a), g = c ? c.getPropertyValue(b) || c[b] : void 0, c && (g !== '' || m.contains(a.ownerDocument, a) || (g = m.style(a, b)), Hb.test(g) && Gb.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = g, g = c.width, h.width = d, h.minWidth = e, h.maxWidth = f)), void 0 === g ? g : g + '';
  }) : y.documentElement.currentStyle && (Ib = function(a) { return a.currentStyle; }, Jb = function(a, b, c) {
    let d,
      e,
      f,
      g,
      h = a.style; return c = c || Ib(a), g = c ? c[b] : void 0, g == null && h && h[b] && (g = h[b]), Hb.test(g) && !Kb.test(b) && (d = h.left, e = a.runtimeStyle, f = e && e.left, f && (e.left = a.currentStyle.left), h.left = b === 'fontSize' ? '1em' : g, g = h.pixelLeft + 'px', h.left = d, f && (e.left = f)), void 0 === g ? g : g + '' || 'auto';
  }); function Lb(a, b) { return { get() { const c = a(); if (c != null) return c ? void delete this.get : (this.get = b).apply(this, arguments); } }; }!function() {
    let b,
      c,
      d,
      e,
      f,
      g,
      h; if (b = y.createElement('div'), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName('a')[0], c = d && d.style) {
      c.cssText = 'float:left;opacity:.5', k.opacity = c.opacity === '0.5', k.cssFloat = !!c.cssFloat, b.style.backgroundClip = 'content-box', b.cloneNode(!0).style.backgroundClip = '', k.clearCloneStyle = b.style.backgroundClip === 'content-box', k.boxSizing = c.boxSizing === '' || c.MozBoxSizing === '' || c.WebkitBoxSizing === '', m.extend(k, { reliableHiddenOffsets() { return g == null && i(), g; }, boxSizingReliable() { return f == null && i(), f; }, pixelPosition() { return e == null && i(), e; }, reliableMarginRight() { return h == null && i(), h; } }); function i() {
        let b,
          c,
          d,
          i; c = y.getElementsByTagName('body')[0], c && c.style && (b = y.createElement('div'), d = y.createElement('div'), d.style.cssText = 'position:absolute;border:0;width:0;height:0;top:0;left:-9999px', c.appendChild(d).appendChild(b), b.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute', e = f = !1, h = !0, a.getComputedStyle && (e = (a.getComputedStyle(b, null) || {}).top !== '1%', f = (a.getComputedStyle(b, null) || { width: '4px' }).width === '4px', i = b.appendChild(y.createElement('div')), i.style.cssText = b.style.cssText = '-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0', i.style.marginRight = i.style.width = '0', b.style.width = '1px', h = !parseFloat((a.getComputedStyle(i, null) || {}).marginRight)), b.innerHTML = '<table><tr><td></td><td>t</td></tr></table>', i = b.getElementsByTagName('td'), i[0].style.cssText = 'margin:0;border:0;padding:0;display:none', g = i[0].offsetHeight === 0, g && (i[0].style.display = '', i[1].style.display = 'none', g = i[0].offsetHeight === 0), c.removeChild(d));
      }
    }
  }(), m.swap = function(a, b, c, d) {
    let e,
      f,
      g = {}; for (f in b)g[f] = a.style[f], a.style[f] = b[f]; e = c.apply(a, d || []); for (f in b)a.style[f] = g[f]; return e;
  }; const Mb = /alpha\([^)]*\)/i,
    Nb = /opacity\s*=\s*([^)]*)/,
    Ob = /^(none|table(?!-c[ea]).+)/,
    Pb = new RegExp('^(' + S + ')(.*)$', 'i'),
    Qb = new RegExp('^([+-])=(' + S + ')', 'i'),
    Rb = { position: 'absolute', visibility: 'hidden', display: 'block' },
    Sb = { letterSpacing: '0', fontWeight: '400' },
    Tb = [ 'Webkit', 'O', 'Moz', 'ms' ]; function Ub(a, b) {
    if (b in a) return b; const c = b.charAt(0).toUpperCase() + b.slice(1),
      d = b,
      e = Tb.length; while (e--) if (b = Tb[e] + c, b in a) return b; return d;
  } function Vb(a, b) { for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)d = a[g], d.style && (f[g] = m._data(d, 'olddisplay'), c = d.style.display, b ? (f[g] || c !== 'none' || (d.style.display = ''), d.style.display === '' && U(d) && (f[g] = m._data(d, 'olddisplay', Fb(d.nodeName)))) : (e = U(d), (c && c !== 'none' || !e) && m._data(d, 'olddisplay', e ? c : m.css(d, 'display')))); for (g = 0; h > g; g++)d = a[g], d.style && (b && d.style.display !== 'none' && d.style.display !== '' || (d.style.display = b ? f[g] || '' : 'none')); return a; } function Wb(a, b, c) { const d = Pb.exec(b); return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || 'px') : b; } function Xb(a, b, c, d, e) { for (var f = c === (d ? 'border' : 'content') ? 4 : b === 'width' ? 1 : 0, g = 0; f < 4; f += 2)c === 'margin' && (g += m.css(a, c + T[f], !0, e)), d ? (c === 'content' && (g -= m.css(a, 'padding' + T[f], !0, e)), c !== 'margin' && (g -= m.css(a, 'border' + T[f] + 'Width', !0, e))) : (g += m.css(a, 'padding' + T[f], !0, e), c !== 'padding' && (g += m.css(a, 'border' + T[f] + 'Width', !0, e))); return g; } function Yb(a, b, c) {
    let d = !0,
      e = b === 'width' ? a.offsetWidth : a.offsetHeight,
      f = Ib(a),
      g = k.boxSizing && m.css(a, 'boxSizing', !1, f) === 'border-box'; if (e <= 0 || e == null) { if (e = Jb(a, b, f), (e < 0 || e == null) && (e = a.style[b]), Hb.test(e)) return e; d = g && (k.boxSizingReliable() || e === a.style[b]), e = parseFloat(e) || 0; } return e + Xb(a, b, c || (g ? 'border' : 'content'), d, f) + 'px';
  }m.extend({ cssHooks: { opacity: { get(a, b) { if (b) { const c = Jb(a, 'opacity'); return c === '' ? '1' : c; } } } }, cssNumber: { columnCount: !0, fillOpacity: !0, flexGrow: !0, flexShrink: !0, fontWeight: !0, lineHeight: !0, opacity: !0, order: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { float: k.cssFloat ? 'cssFloat' : 'styleFloat' }, style(a, b, c, d) {
    if (a && a.nodeType !== 3 && a.nodeType !== 8 && a.style) {
      let e,
        f,
        g,
        h = m.camelCase(b),
        i = a.style; if (b = m.cssProps[h] || (m.cssProps[h] = Ub(i, h)), g = m.cssHooks[b] || m.cssHooks[h], void 0 === c) return g && 'get' in g && void 0 !== (e = g.get(a, !1, d)) ? e : i[b]; if (f = typeof c, f === 'string' && (e = Qb.exec(c)) && (c = (e[1] + 1) * e[2] + parseFloat(m.css(a, b)), f = 'number'), c != null && c === c && (f !== 'number' || m.cssNumber[h] || (c += 'px'), k.clearCloneStyle || c !== '' || b.indexOf('background') !== 0 || (i[b] = 'inherit'), !(g && 'set' in g && void 0 === (c = g.set(a, c, d))))) try { i[b] = c; } catch (j) {}
    }
  }, css(a, b, c, d) {
    let e,
      f,
      g,
      h = m.camelCase(b); return b = m.cssProps[h] || (m.cssProps[h] = Ub(a.style, h)), g = m.cssHooks[b] || m.cssHooks[h], g && 'get' in g && (f = g.get(a, !0, c)), void 0 === f && (f = Jb(a, b, d)), f === 'normal' && b in Sb && (f = Sb[b]), c === '' || c ? (e = parseFloat(f), c === !0 || m.isNumeric(e) ? e || 0 : f) : f;
  } }), m.each([ 'height', 'width' ], function(a, b) { m.cssHooks[b] = { get(a, c, d) { return c ? Ob.test(m.css(a, 'display')) && a.offsetWidth === 0 ? m.swap(a, Rb, function() { return Yb(a, b, d); }) : Yb(a, b, d) : void 0; }, set(a, c, d) { const e = d && Ib(a); return Wb(a, c, d ? Xb(a, b, d, k.boxSizing && m.css(a, 'boxSizing', !1, e) === 'border-box', e) : 0); } }; }), k.opacity || (m.cssHooks.opacity = { get(a, b) { return Nb.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || '') ? 0.01 * parseFloat(RegExp.$1) + '' : b ? '1' : ''; }, set(a, b) {
    const c = a.style,
      d = a.currentStyle,
      e = m.isNumeric(b) ? 'alpha(opacity=' + 100 * b + ')' : '',
      f = d && d.filter || c.filter || ''; c.zoom = 1, (b >= 1 || b === '') && m.trim(f.replace(Mb, '')) === '' && c.removeAttribute && (c.removeAttribute('filter'), b === '' || d && !d.filter) || (c.filter = Mb.test(f) ? f.replace(Mb, e) : f + ' ' + e);
  } }), m.cssHooks.marginRight = Lb(k.reliableMarginRight, function(a, b) { return b ? m.swap(a, { display: 'inline-block' }, Jb, [ a, 'marginRight' ]) : void 0; }), m.each({ margin: '', padding: '', border: 'Width' }, function(a, b) { m.cssHooks[a + b] = { expand(c) { for (var d = 0, e = {}, f = typeof c === 'string' ? c.split(' ') : [ c ]; d < 4; d++)e[a + T[d] + b] = f[d] || f[d - 2] || f[0]; return e; } }, Gb.test(a) || (m.cssHooks[a + b].set = Wb); }), m.fn.extend({ css(a, b) {
    return V(this, function(a, b, c) {
      let d,
        e,
        f = {},
        g = 0; if (m.isArray(b)) { for (d = Ib(a), e = b.length; e > g; g++)f[b[g]] = m.css(a, b[g], !1, d); return f; } return void 0 !== c ? m.style(a, b, c) : m.css(a, b);
    }, a, b, arguments.length > 1);
  }, show() { return Vb(this, !0); }, hide() { return Vb(this); }, toggle(a) { return typeof a === 'boolean' ? a ? this.show() : this.hide() : this.each(function() { U(this) ? m(this).show() : m(this).hide(); }); } }); function Zb(a, b, c, d, e) { return new Zb.prototype.init(a, b, c, d, e); }m.Tween = Zb, Zb.prototype = { constructor: Zb, init(a, b, c, d, e, f) {
    this.elem = a, this.prop = c, this.easing = e || 'swing', this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (m.cssNumber[c] ? '' : 'px');
  }, cur() { const a = Zb.propHooks[this.prop]; return a && a.get ? a.get(this) : Zb.propHooks._default.get(this); }, run(a) {
    let b,
      c = Zb.propHooks[this.prop]; return this.pos = b = this.options.duration ? m.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration) : a, this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : Zb.propHooks._default.set(this), this;
  } }, Zb.prototype.init.prototype = Zb.prototype, Zb.propHooks = { _default: { get(a) { let b; return a.elem[a.prop] == null || a.elem.style && a.elem.style[a.prop] != null ? (b = m.css(a.elem, a.prop, ''), b && b !== 'auto' ? b : 0) : a.elem[a.prop]; }, set(a) { m.fx.step[a.prop] ? m.fx.step[a.prop](a) : a.elem.style && (a.elem.style[m.cssProps[a.prop]] != null || m.cssHooks[a.prop]) ? m.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now; } } }, Zb.propHooks.scrollTop = Zb.propHooks.scrollLeft = { set(a) { a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now); } }, m.easing = { linear(a) { return a; }, swing(a) { return 0.5 - Math.cos(a * Math.PI) / 2; } }, m.fx = Zb.prototype.init, m.fx.step = {}; let $b,
    _b,
    ac = /^(?:toggle|show|hide)$/,
    bc = new RegExp('^(?:([+-])=|)(' + S + ')([a-z%]*)$', 'i'),
    cc = /queueHooks$/,
    dc = [ ic ],
    ec = { '*': [ function(a, b) {
      let c = this.createTween(a, b),
        d = c.cur(),
        e = bc.exec(b),
        f = e && e[3] || (m.cssNumber[a] ? '' : 'px'),
        g = (m.cssNumber[a] || f !== 'px' && +d) && bc.exec(m.css(c.elem, a)),
        h = 1,
        i = 20; if (g && g[3] !== f) { f = f || g[3], e = e || [], g = +d || 1; do h = h || '.5', g /= h, m.style(c.elem, a, g + f); while (h !== (h = c.cur() / d) && h !== 1 && --i); } return e && (g = c.start = +g || +d || 0, c.unit = f, c.end = e[1] ? g + (e[1] + 1) * e[2] : +e[2]), c;
    } ] }; function fc() { return setTimeout(function() { $b = void 0; }), $b = m.now(); } function gc(a, b) {
    let c,
      d = { height: a },
      e = 0; for (b = b ? 1 : 0; e < 4; e += 2 - b)c = T[e], d['margin' + c] = d['padding' + c] = a; return b && (d.opacity = d.width = a), d;
  } function hc(a, b, c) { for (var d, e = (ec[b] || []).concat(ec['*']), f = 0, g = e.length; g > f; f++) if (d = e[f].call(c, b, a)) return d; } function ic(a, b, c) {
    let d,
      e,
      f,
      g,
      h,
      i,
      j,
      l,
      n = this,
      o = {},
      p = a.style,
      q = a.nodeType && U(a),
      r = m._data(a, 'fxshow'); c.queue || (h = m._queueHooks(a, 'fx'), h.unqueued == null && (h.unqueued = 0, i = h.empty.fire, h.empty.fire = function() { h.unqueued || i(); }), h.unqueued++, n.always(function() { n.always(function() { h.unqueued--, m.queue(a, 'fx').length || h.empty.fire(); }); })), a.nodeType === 1 && ('height' in b || 'width' in b) && (c.overflow = [ p.overflow, p.overflowX, p.overflowY ], j = m.css(a, 'display'), l = j === 'none' ? m._data(a, 'olddisplay') || Fb(a.nodeName) : j, l === 'inline' && m.css(a, 'float') === 'none' && (k.inlineBlockNeedsLayout && Fb(a.nodeName) !== 'inline' ? p.zoom = 1 : p.display = 'inline-block')), c.overflow && (p.overflow = 'hidden', k.shrinkWrapBlocks() || n.always(function() { p.overflow = c.overflow[0], p.overflowX = c.overflow[1], p.overflowY = c.overflow[2]; })); for (d in b) if (e = b[d], ac.exec(e)) { if (delete b[d], f = f || e === 'toggle', e === (q ? 'hide' : 'show')) { if (e !== 'show' || !r || void 0 === r[d]) continue; q = !0; }o[d] = r && r[d] || m.style(a, d); } else j = void 0; if (m.isEmptyObject(o))(j === 'none' ? Fb(a.nodeName) : j) === 'inline' && (p.display = j); else { r ? 'hidden' in r && (q = r.hidden) : r = m._data(a, 'fxshow', {}), f && (r.hidden = !q), q ? m(a).show() : n.done(function() { m(a).hide(); }), n.done(function() { let b; m._removeData(a, 'fxshow'); for (b in o)m.style(a, b, o[b]); }); for (d in o)g = hc(q ? r[d] : 0, d, n), d in r || (r[d] = g.start, q && (g.end = g.start, g.start = d === 'width' || d === 'height' ? 1 : 0)); }
  } function jc(a, b) {
    let c,
      d,
      e,
      f,
      g; for (c in a) if (d = m.camelCase(c), e = b[d], f = a[c], m.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = m.cssHooks[d], g && 'expand' in g) { f = g.expand(f), delete a[d]; for (c in f)c in a || (a[c] = f[c], b[c] = e); } else b[d] = e;
  } function kc(a, b, c) {
    var d,
      e,
      f = 0,
      g = dc.length,
      h = m.Deferred().always(function() { delete i.elem; }),
      i = function() { if (e) return !1; for (var b = $b || fc(), c = Math.max(0, j.startTime + j.duration - b), d = c / j.duration || 0, f = 1 - d, g = 0, i = j.tweens.length; i > g; g++)j.tweens[g].run(f); return h.notifyWith(a, [ j, f, c ]), f < 1 && i ? c : (h.resolveWith(a, [ j ]), !1); },
      j = h.promise({ elem: a, props: m.extend({}, b), opts: m.extend(!0, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: $b || fc(), duration: c.duration, tweens: [], createTween(b, c) { const d = m.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing); return j.tweens.push(d), d; }, stop(b) {
        let c = 0,
          d = b ? j.tweens.length : 0; if (e) return this; for (e = !0; d > c; c++)j.tweens[c].run(1); return b ? h.resolveWith(a, [ j, b ]) : h.rejectWith(a, [ j, b ]), this;
      } }),
      k = j.props; for (jc(k, j.opts.specialEasing); g > f; f++) if (d = dc[f].call(j, a, k, j.opts)) return d; return m.map(k, hc, j), m.isFunction(j.opts.start) && j.opts.start.call(a, j), m.fx.timer(m.extend(i, { elem: a, anim: j, queue: j.opts.queue })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail)
      .always(j.opts.always);
  }m.Animation = m.extend(kc, { tweener(a, b) { m.isFunction(a) ? (b = a, a = [ '*' ]) : a = a.split(' '); for (var c, d = 0, e = a.length; e > d; d++)c = a[d], ec[c] = ec[c] || [], ec[c].unshift(b); }, prefilter(a, b) { b ? dc.unshift(a) : dc.push(a); } }), m.speed = function(a, b, c) { const d = a && typeof a === 'object' ? m.extend({}, a) : { complete: c || !c && b || m.isFunction(a) && a, duration: a, easing: c && b || b && !m.isFunction(b) && b }; return d.duration = m.fx.off ? 0 : typeof d.duration === 'number' ? d.duration : d.duration in m.fx.speeds ? m.fx.speeds[d.duration] : m.fx.speeds._default, (d.queue == null || d.queue === !0) && (d.queue = 'fx'), d.old = d.complete, d.complete = function() { m.isFunction(d.old) && d.old.call(this), d.queue && m.dequeue(this, d.queue); }, d; }, m.fn.extend({ fadeTo(a, b, c, d) {
    return this.filter(U).css('opacity', 0).show()
      .end()
      .animate({ opacity: b }, a, c, d);
  }, animate(a, b, c, d) {
    const e = m.isEmptyObject(a),
      f = m.speed(b, c, d),
      g = function() { const b = kc(this, m.extend({}, a), f); (e || m._data(this, 'finish')) && b.stop(!0); }; return g.finish = g, e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g);
  }, stop(a, b, c) {
    const d = function(a) { const b = a.stop; delete a.stop, b(c); }; return typeof a !== 'string' && (c = b, b = a, a = void 0), b && a !== !1 && this.queue(a || 'fx', []), this.each(function() {
      let b = !0,
        e = a != null && a + 'queueHooks',
        f = m.timers,
        g = m._data(this); if (e)g[e] && g[e].stop && d(g[e]); else for (e in g)g[e] && g[e].stop && cc.test(e) && d(g[e]); for (e = f.length; e--;)f[e].elem !== this || a != null && f[e].queue !== a || (f[e].anim.stop(c), b = !1, f.splice(e, 1)); (b || !c) && m.dequeue(this, a);
    });
  }, finish(a) {
    return a !== !1 && (a = a || 'fx'), this.each(function() {
      let b,
        c = m._data(this),
        d = c[a + 'queue'],
        e = c[a + 'queueHooks'],
        f = m.timers,
        g = d ? d.length : 0; for (c.finish = !0, m.queue(this, a, []), e && e.stop && e.stop.call(this, !0), b = f.length; b--;)f[b].elem === this && f[b].queue === a && (f[b].anim.stop(!0), f.splice(b, 1)); for (b = 0; g > b; b++)d[b] && d[b].finish && d[b].finish.call(this); delete c.finish;
    });
  } }), m.each([ 'toggle', 'show', 'hide' ], function(a, b) { const c = m.fn[b]; m.fn[b] = function(a, d, e) { return a == null || typeof a === 'boolean' ? c.apply(this, arguments) : this.animate(gc(b, !0), a, d, e); }; }), m.each({ slideDown: gc('show'), slideUp: gc('hide'), slideToggle: gc('toggle'), fadeIn: { opacity: 'show' }, fadeOut: { opacity: 'hide' }, fadeToggle: { opacity: 'toggle' } }, function(a, b) { m.fn[a] = function(a, c, d) { return this.animate(b, a, c, d); }; }), m.timers = [], m.fx.tick = function() {
    let a,
      b = m.timers,
      c = 0; for ($b = m.now(); c < b.length; c++)a = b[c], a() || b[c] !== a || b.splice(c--, 1); b.length || m.fx.stop(), $b = void 0;
  }, m.fx.timer = function(a) { m.timers.push(a), a() ? m.fx.start() : m.timers.pop(); }, m.fx.interval = 13, m.fx.start = function() { _b || (_b = setInterval(m.fx.tick, m.fx.interval)); }, m.fx.stop = function() { clearInterval(_b), _b = null; }, m.fx.speeds = { slow: 600, fast: 200, _default: 400 }, m.fn.delay = function(a, b) { return a = m.fx ? m.fx.speeds[a] || a : a, b = b || 'fx', this.queue(b, function(b, c) { const d = setTimeout(b, a); c.stop = function() { clearTimeout(d); }; }); }, function() {
    let a,
      b,
      c,
      d,
      e; b = y.createElement('div'), b.setAttribute('className', 't'), b.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", d = b.getElementsByTagName('a')[0], c = y.createElement('select'), e = c.appendChild(y.createElement('option')), a = b.getElementsByTagName('input')[0], d.style.cssText = 'top:1px', k.getSetAttribute = b.className !== 't', k.style = /top/.test(d.getAttribute('style')), k.hrefNormalized = d.getAttribute('href') === '/a', k.checkOn = !!a.value, k.optSelected = e.selected, k.enctype = !!y.createElement('form').enctype, c.disabled = !0, k.optDisabled = !e.disabled, a = y.createElement('input'), a.setAttribute('value', ''), k.input = a.getAttribute('value') === '', a.value = 't', a.setAttribute('type', 'radio'), k.radioValue = a.value === 't';
  }(); const lc = /\r/g; m.fn.extend({ val(a) {
    let b,
      c,
      d,
      e = this[0]; { if (arguments.length) return d = m.isFunction(a), this.each(function(c) { let e; this.nodeType === 1 && (e = d ? a.call(this, c, m(this).val()) : a, e == null ? e = '' : typeof e === 'number' ? e += '' : m.isArray(e) && (e = m.map(e, function(a) { return a == null ? '' : a + ''; })), b = m.valHooks[this.type] || m.valHooks[this.nodeName.toLowerCase()], b && 'set' in b && void 0 !== b.set(this, e, 'value') || (this.value = e)); }); if (e) return b = m.valHooks[e.type] || m.valHooks[e.nodeName.toLowerCase()], b && 'get' in b && void 0 !== (c = b.get(e, 'value')) ? c : (c = e.value, typeof c === 'string' ? c.replace(lc, '') : c == null ? '' : c); }
  } }), m.extend({ valHooks: { option: { get(a) { const b = m.find.attr(a, 'value'); return b != null ? b : m.trim(m.text(a)); } }, select: { get(a) { for (var b, c, d = a.options, e = a.selectedIndex, f = a.type === 'select-one' || e < 0, g = f ? null : [], h = f ? e + 1 : d.length, i = e < 0 ? h : f ? e : 0; h > i; i++) if (c = d[i], !(!c.selected && i !== e || (k.optDisabled ? c.disabled : c.getAttribute('disabled') !== null) || c.parentNode.disabled && m.nodeName(c.parentNode, 'optgroup'))) { if (b = m(c).val(), f) return b; g.push(b); } return g; }, set(a, b) {
    let c,
      d,
      e = a.options,
      f = m.makeArray(b),
      g = e.length; while (g--) if (d = e[g], m.inArray(m.valHooks.option.get(d), f) >= 0) try { d.selected = c = !0; } catch (h) { d.scrollHeight; } else d.selected = !1; return c || (a.selectedIndex = -1), e;
  } } } }), m.each([ 'radio', 'checkbox' ], function() { m.valHooks[this] = { set(a, b) { return m.isArray(b) ? a.checked = m.inArray(m(a).val(), b) >= 0 : void 0; } }, k.checkOn || (m.valHooks[this].get = function(a) { return a.getAttribute('value') === null ? 'on' : a.value; }); }); let mc,
    nc,
    oc = m.expr.attrHandle,
    pc = /^(?:checked|selected)$/i,
    qc = k.getSetAttribute,
    rc = k.input; m.fn.extend({ attr(a, b) { return V(this, m.attr, a, b, arguments.length > 1); }, removeAttr(a) { return this.each(function() { m.removeAttr(this, a); }); } }), m.extend({ attr(a, b, c) {
    let d,
      e,
      f = a.nodeType; if (a && f !== 3 && f !== 8 && f !== 2) return typeof a.getAttribute === K ? m.prop(a, b, c) : (f === 1 && m.isXMLDoc(a) || (b = b.toLowerCase(), d = m.attrHooks[b] || (m.expr.match.bool.test(b) ? nc : mc)), void 0 === c ? d && 'get' in d && (e = d.get(a, b)) !== null ? e : (e = m.find.attr(a, b), e == null ? void 0 : e) : c !== null ? d && 'set' in d && void 0 !== (e = d.set(a, c, b)) ? e : (a.setAttribute(b, c + ''), c) : void m.removeAttr(a, b));
  }, removeAttr(a, b) {
    let c,
      d,
      e = 0,
      f = b && b.match(E); if (f && a.nodeType === 1) while (c = f[e++])d = m.propFix[c] || c, m.expr.match.bool.test(c) ? rc && qc || !pc.test(c) ? a[d] = !1 : a[m.camelCase('default-' + c)] = a[d] = !1 : m.attr(a, c, ''), a.removeAttribute(qc ? c : d);
  }, attrHooks: { type: { set(a, b) { if (!k.radioValue && b === 'radio' && m.nodeName(a, 'input')) { const c = a.value; return a.setAttribute('type', b), c && (a.value = c), b; } } } } }), nc = { set(a, b, c) { return b === !1 ? m.removeAttr(a, c) : rc && qc || !pc.test(c) ? a.setAttribute(!qc && m.propFix[c] || c, c) : a[m.camelCase('default-' + c)] = a[c] = !0, c; } }, m.each(m.expr.match.bool.source.match(/\w+/g), function(a, b) {
    const c = oc[b] || m.find.attr; oc[b] = rc && qc || !pc.test(b) ? function(a, b, d) {
      let e,
        f; return d || (f = oc[b], oc[b] = e, e = c(a, b, d) != null ? b.toLowerCase() : null, oc[b] = f), e;
    } : function(a, b, c) { return c ? void 0 : a[m.camelCase('default-' + b)] ? b.toLowerCase() : null; };
  }), rc && qc || (m.attrHooks.value = { set(a, b, c) { return m.nodeName(a, 'input') ? void (a.defaultValue = b) : mc && mc.set(a, b, c); } }), qc || (mc = { set(a, b, c) { let d = a.getAttributeNode(c); return d || a.setAttributeNode(d = a.ownerDocument.createAttribute(c)), d.value = b += '', c === 'value' || b === a.getAttribute(c) ? b : void 0; } }, oc.id = oc.name = oc.coords = function(a, b, c) { let d; return c ? void 0 : (d = a.getAttributeNode(b)) && d.value !== '' ? d.value : null; }, m.valHooks.button = { get(a, b) { const c = a.getAttributeNode(b); return c && c.specified ? c.value : void 0; }, set: mc.set }, m.attrHooks.contenteditable = { set(a, b, c) { mc.set(a, b === '' ? !1 : b, c); } }, m.each([ 'width', 'height' ], function(a, b) { m.attrHooks[b] = { set(a, c) { return c === '' ? (a.setAttribute(b, 'auto'), c) : void 0; } }; })), k.style || (m.attrHooks.style = { get(a) { return a.style.cssText || void 0; }, set(a, b) { return a.style.cssText = b + ''; } }); const sc = /^(?:input|select|textarea|button|object)$/i,
    tc = /^(?:a|area)$/i; m.fn.extend({ prop(a, b) { return V(this, m.prop, a, b, arguments.length > 1); }, removeProp(a) { return a = m.propFix[a] || a, this.each(function() { try { this[a] = void 0, delete this[a]; } catch (b) {} }); } }), m.extend({ propFix: { for: 'htmlFor', class: 'className' }, prop(a, b, c) {
    let d,
      e,
      f,
      g = a.nodeType; if (a && g !== 3 && g !== 8 && g !== 2) return f = g !== 1 || !m.isXMLDoc(a), f && (b = m.propFix[b] || b, e = m.propHooks[b]), void 0 !== c ? e && 'set' in e && void 0 !== (d = e.set(a, c, b)) ? d : a[b] = c : e && 'get' in e && (d = e.get(a, b)) !== null ? d : a[b];
  }, propHooks: { tabIndex: { get(a) { const b = m.find.attr(a, 'tabindex'); return b ? parseInt(b, 10) : sc.test(a.nodeName) || tc.test(a.nodeName) && a.href ? 0 : -1; } } } }), k.hrefNormalized || m.each([ 'href', 'src' ], function(a, b) { m.propHooks[b] = { get(a) { return a.getAttribute(b, 4); } }; }), k.optSelected || (m.propHooks.selected = { get(a) { const b = a.parentNode; return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null; } }), m.each([ 'tabIndex', 'readOnly', 'maxLength', 'cellSpacing', 'cellPadding', 'rowSpan', 'colSpan', 'useMap', 'frameBorder', 'contentEditable' ], function() { m.propFix[this.toLowerCase()] = this; }), k.enctype || (m.propFix.enctype = 'encoding'); const uc = /[\t\r\n\f]/g; m.fn.extend({ addClass(a) {
    let b,
      c,
      d,
      e,
      f,
      g,
      h = 0,
      i = this.length,
      j = typeof a === 'string' && a; if (m.isFunction(a)) return this.each(function(b) { m(this).addClass(a.call(this, b, this.className)); }); if (j) for (b = (a || '').match(E) || []; i > h; h++) if (c = this[h], d = c.nodeType === 1 && (c.className ? (' ' + c.className + ' ').replace(uc, ' ') : ' ')) { f = 0; while (e = b[f++])d.indexOf(' ' + e + ' ') < 0 && (d += e + ' '); g = m.trim(d), c.className !== g && (c.className = g); } return this;
  }, removeClass(a) {
    let b,
      c,
      d,
      e,
      f,
      g,
      h = 0,
      i = this.length,
      j = arguments.length === 0 || typeof a === 'string' && a; if (m.isFunction(a)) return this.each(function(b) { m(this).removeClass(a.call(this, b, this.className)); }); if (j) for (b = (a || '').match(E) || []; i > h; h++) if (c = this[h], d = c.nodeType === 1 && (c.className ? (' ' + c.className + ' ').replace(uc, ' ') : '')) { f = 0; while (e = b[f++]) while (d.indexOf(' ' + e + ' ') >= 0)d = d.replace(' ' + e + ' ', ' '); g = a ? m.trim(d) : '', c.className !== g && (c.className = g); } return this;
  }, toggleClass(a, b) {
    const c = typeof a; return typeof b === 'boolean' && c === 'string' ? b ? this.addClass(a) : this.removeClass(a) : this.each(m.isFunction(a) ? function(c) { m(this).toggleClass(a.call(this, c, this.className, b), b); } : function() {
      if (c === 'string') {
        let b,
          d = 0,
          e = m(this),
          f = a.match(E) || []; while (b = f[d++])e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
      } else (c === K || c === 'boolean') && (this.className && m._data(this, '__className__', this.className), this.className = this.className || a === !1 ? '' : m._data(this, '__className__') || '');
    });
  }, hasClass(a) { for (let b = ' ' + a + ' ', c = 0, d = this.length; d > c; c++) if (this[c].nodeType === 1 && (' ' + this[c].className + ' ').replace(uc, ' ').indexOf(b) >= 0) return !0; return !1; } }), m.each('blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu'.split(' '), function(a, b) { m.fn[b] = function(a, c) { return arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b); }; }), m.fn.extend({ hover(a, b) { return this.mouseenter(a).mouseleave(b || a); }, bind(a, b, c) { return this.on(a, null, b, c); }, unbind(a, b) { return this.off(a, null, b); }, delegate(a, b, c, d) { return this.on(b, a, c, d); }, undelegate(a, b, c) { return arguments.length === 1 ? this.off(a, '**') : this.off(b, a || '**', c); } }); let vc = m.now(),
    wc = /\?/,
    xc = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g; m.parseJSON = function(b) {
    if (a.JSON && a.JSON.parse) return a.JSON.parse(b + ''); let c,
      d = null,
      e = m.trim(b + ''); return e && !m.trim(e.replace(xc, function(a, b, e, f) { return c && b && (d = 0), d === 0 ? a : (c = e || b, d += !f - !e, ''); })) ? Function('return ' + e)() : m.error('Invalid JSON: ' + b);
  }, m.parseXML = function(b) {
    let c,
      d; if (!b || typeof b !== 'string') return null; try { a.DOMParser ? (d = new DOMParser(), c = d.parseFromString(b, 'text/xml')) : (c = new ActiveXObject('Microsoft.XMLDOM'), c.async = 'false', c.loadXML(b)); } catch (e) { c = void 0; } return c && c.documentElement && !c.getElementsByTagName('parsererror').length || m.error('Invalid XML: ' + b), c;
  }; let yc,
    zc,
    Ac = /#.*$/,
    Bc = /([?&])_=[^&]*/,
    Cc = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Dc = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Ec = /^(?:GET|HEAD)$/,
    Fc = /^\/\//,
    Gc = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    Hc = {},
    Ic = {},
    Jc = '*/'.concat('*'); try { zc = location.href; } catch (Kc) { zc = y.createElement('a'), zc.href = '', zc = zc.href; }yc = Gc.exec(zc.toLowerCase()) || []; function Lc(a) {
    return function(b, c) {
      typeof b !== 'string' && (c = b, b = '*'); let d,
        e = 0,
        f = b.toLowerCase().match(E) || []; if (m.isFunction(c)) while (d = f[e++])d.charAt(0) === '+' ? (d = d.slice(1) || '*', (a[d] = a[d] || []).unshift(c)) : (a[d] = a[d] || []).push(c);
    };
  } function Mc(a, b, c, d) {
    const e = {},
      f = a === Ic; function g(h) { let i; return e[h] = !0, m.each(a[h] || [], function(a, h) { const j = h(b, c, d); return typeof j !== 'string' || f || e[j] ? f ? !(i = j) : void 0 : (b.dataTypes.unshift(j), g(j), !1); }), i; } return g(b.dataTypes[0]) || !e['*'] && g('*');
  } function Nc(a, b) {
    let c,
      d,
      e = m.ajaxSettings.flatOptions || {}; for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]); return c && m.extend(!0, a, c), a;
  } function Oc(a, b, c) {
    let d,
      e,
      f,
      g,
      h = a.contents,
      i = a.dataTypes; while (i[0] === '*')i.shift(), void 0 === e && (e = a.mimeType || b.getResponseHeader('Content-Type')); if (e) for (g in h) if (h[g] && h[g].test(e)) { i.unshift(g); break; } if (i[0] in c)f = i[0]; else { for (g in c) { if (!i[0] || a.converters[g + ' ' + i[0]]) { f = g; break; }d || (d = g); }f = f || d; } return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
  } function Pc(a, b, c, d) {
    let e,
      f,
      g,
      h,
      i,
      j = {},
      k = a.dataTypes.slice(); if (k[1]) for (g in a.converters)j[g.toLowerCase()] = a.converters[g]; f = k.shift(); while (f) if (a.responseFields[f] && (c[a.responseFields[f]] = b), !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)), i = f, f = k.shift()) if (f === '*')f = i; else if (i !== '*' && i !== f) { if (g = j[i + ' ' + f] || j['* ' + f], !g) for (e in j) if (h = e.split(' '), h[1] === f && (g = j[i + ' ' + h[0]] || j['* ' + h[0]])) { g === !0 ? g = j[e] : j[e] !== !0 && (f = h[0], k.unshift(h[1])); break; } if (g !== !0) if (g && a.throws)b = g(b); else try { b = g(b); } catch (l) { return { state: 'parsererror', error: g ? l : 'No conversion from ' + i + ' to ' + f }; } } return { state: 'success', data: b };
  }m.extend({ active: 0, lastModified: {}, etag: {}, ajaxSettings: { url: zc, type: 'GET', isLocal: Dc.test(yc[1]), global: !0, processData: !0, async: !0, contentType: 'application/x-www-form-urlencoded; charset=UTF-8', accepts: { '*': Jc, text: 'text/plain', html: 'text/html', xml: 'application/xml, text/xml', json: 'application/json, text/javascript' }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: 'responseXML', text: 'responseText', json: 'responseJSON' }, converters: { '* text': String, 'text html': !0, 'text json': m.parseJSON, 'text xml': m.parseXML }, flatOptions: { url: !0, context: !0 } }, ajaxSetup(a, b) { return b ? Nc(Nc(a, m.ajaxSettings), b) : Nc(m.ajaxSettings, a); }, ajaxPrefilter: Lc(Hc), ajaxTransport: Lc(Ic), ajax(a, b) {
    typeof a === 'object' && (b = a, a = void 0), b = b || {}; var c,
      d,
      e,
      f,
      g,
      h,
      i,
      j,
      k = m.ajaxSetup({}, b),
      l = k.context || k,
      n = k.context && (l.nodeType || l.jquery) ? m(l) : m.event,
      o = m.Deferred(),
      p = m.Callbacks('once memory'),
      q = k.statusCode || {},
      r = {},
      s = {},
      t = 0,
      u = 'canceled',
      v = { readyState: 0, getResponseHeader(a) { let b; if (t === 2) { if (!j) { j = {}; while (b = Cc.exec(f))j[b[1].toLowerCase()] = b[2]; }b = j[a.toLowerCase()]; } return b == null ? null : b; }, getAllResponseHeaders() { return t === 2 ? f : null; }, setRequestHeader(a, b) { const c = a.toLowerCase(); return t || (a = s[c] = s[c] || a, r[a] = b), this; }, overrideMimeType(a) { return t || (k.mimeType = a), this; }, statusCode(a) { let b; if (a) if (t < 2) for (b in a)q[b] = [ q[b], a[b] ]; else v.always(a[v.status]); return this; }, abort(a) { const b = a || u; return i && i.abort(b), x(0, b), this; } }; if (o.promise(v).complete = p.add, v.success = v.done, v.error = v.fail, k.url = ((a || k.url || zc) + '').replace(Ac, '').replace(Fc, yc[1] + '//'), k.type = b.method || b.type || k.method || k.type, k.dataTypes = m.trim(k.dataType || '*').toLowerCase().match(E) || [ '' ], k.crossDomain == null && (c = Gc.exec(k.url.toLowerCase()), k.crossDomain = !(!c || c[1] === yc[1] && c[2] === yc[2] && (c[3] || (c[1] === 'http:' ? '80' : '443')) === (yc[3] || (yc[1] === 'http:' ? '80' : '443')))), k.data && k.processData && typeof k.data !== 'string' && (k.data = m.param(k.data, k.traditional)), Mc(Hc, k, b, v), t === 2) return v; h = k.global, h && m.active++ === 0 && m.event.trigger('ajaxStart'), k.type = k.type.toUpperCase(), k.hasContent = !Ec.test(k.type), e = k.url, k.hasContent || (k.data && (e = k.url += (wc.test(e) ? '&' : '?') + k.data, delete k.data), k.cache === !1 && (k.url = Bc.test(e) ? e.replace(Bc, '$1_=' + vc++) : e + (wc.test(e) ? '&' : '?') + '_=' + vc++)), k.ifModified && (m.lastModified[e] && v.setRequestHeader('If-Modified-Since', m.lastModified[e]), m.etag[e] && v.setRequestHeader('If-None-Match', m.etag[e])), (k.data && k.hasContent && k.contentType !== !1 || b.contentType) && v.setRequestHeader('Content-Type', k.contentType), v.setRequestHeader('Accept', k.dataTypes[0] && k.accepts[k.dataTypes[0]] ? k.accepts[k.dataTypes[0]] + (k.dataTypes[0] !== '*' ? ', ' + Jc + '; q=0.01' : '') : k.accepts['*']); for (d in k.headers)v.setRequestHeader(d, k.headers[d]); if (k.beforeSend && (k.beforeSend.call(l, v, k) === !1 || t === 2)) return v.abort(); u = 'abort'; for (d in { success: 1, error: 1, complete: 1 })v[d](k[d]); if (i = Mc(Ic, k, b, v)) { v.readyState = 1, h && n.trigger('ajaxSend', [ v, k ]), k.async && k.timeout > 0 && (g = setTimeout(function() { v.abort('timeout'); }, k.timeout)); try { t = 1, i.send(r, x); } catch (w) { if (!(t < 2)) throw w; x(-1, w); } } else x(-1, 'No Transport'); function x(a, b, c, d) {
      let j,
        r,
        s,
        u,
        w,
        x = b; t !== 2 && (t = 2, g && clearTimeout(g), i = void 0, f = d || '', v.readyState = a > 0 ? 4 : 0, j = a >= 200 && a < 300 || a === 304, c && (u = Oc(k, v, c)), u = Pc(k, u, v, j), j ? (k.ifModified && (w = v.getResponseHeader('Last-Modified'), w && (m.lastModified[e] = w), w = v.getResponseHeader('etag'), w && (m.etag[e] = w)), a === 204 || k.type === 'HEAD' ? x = 'nocontent' : a === 304 ? x = 'notmodified' : (x = u.state, r = u.data, s = u.error, j = !s)) : (s = x, (a || !x) && (x = 'error', a < 0 && (a = 0))), v.status = a, v.statusText = (b || x) + '', j ? o.resolveWith(l, [ r, x, v ]) : o.rejectWith(l, [ v, x, s ]), v.statusCode(q), q = void 0, h && n.trigger(j ? 'ajaxSuccess' : 'ajaxError', [ v, k, j ? r : s ]), p.fireWith(l, [ v, x ]), h && (n.trigger('ajaxComplete', [ v, k ]), --m.active || m.event.trigger('ajaxStop')));
    } return v;
  }, getJSON(a, b, c) { return m.get(a, b, c, 'json'); }, getScript(a, b) { return m.get(a, void 0, b, 'script'); } }), m.each([ 'get', 'post' ], function(a, b) { m[b] = function(a, c, d, e) { return m.isFunction(c) && (e = e || d, d = c, c = void 0), m.ajax({ url: a, type: b, dataType: e, data: c, success: d }); }; }), m.each([ 'ajaxStart', 'ajaxStop', 'ajaxComplete', 'ajaxError', 'ajaxSuccess', 'ajaxSend' ], function(a, b) { m.fn[b] = function(a) { return this.on(b, a); }; }), m._evalUrl = function(a) { return m.ajax({ url: a, type: 'GET', dataType: 'script', async: !1, global: !1, throws: !0 }); }, m.fn.extend({ wrapAll(a) { if (m.isFunction(a)) return this.each(function(b) { m(this).wrapAll(a.call(this, b)); }); if (this[0]) { const b = m(a, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && b.insertBefore(this[0]), b.map(function() { let a = this; while (a.firstChild && a.firstChild.nodeType === 1)a = a.firstChild; return a; }).append(this); } return this; }, wrapInner(a) {
    return this.each(m.isFunction(a) ? function(b) { m(this).wrapInner(a.call(this, b)); } : function() {
      const b = m(this),
        c = b.contents(); c.length ? c.wrapAll(a) : b.append(a);
    });
  }, wrap(a) { const b = m.isFunction(a); return this.each(function(c) { m(this).wrapAll(b ? a.call(this, c) : a); }); }, unwrap() { return this.parent().each(function() { m.nodeName(this, 'body') || m(this).replaceWith(this.childNodes); }).end(); } }), m.expr.filters.hidden = function(a) { return a.offsetWidth <= 0 && a.offsetHeight <= 0 || !k.reliableHiddenOffsets() && (a.style && a.style.display || m.css(a, 'display')) === 'none'; }, m.expr.filters.visible = function(a) { return !m.expr.filters.hidden(a); }; const Qc = /%20/g,
    Rc = /\[\]$/,
    Sc = /\r?\n/g,
    Tc = /^(?:submit|button|image|reset|file)$/i,
    Uc = /^(?:input|select|textarea|keygen)/i; function Vc(a, b, c, d) { let e; if (m.isArray(b))m.each(b, function(b, e) { c || Rc.test(a) ? d(a, e) : Vc(a + '[' + (typeof e === 'object' ? b : '') + ']', e, c, d); }); else if (c || m.type(b) !== 'object')d(a, b); else for (e in b)Vc(a + '[' + e + ']', b[e], c, d); }m.param = function(a, b) {
    let c,
      d = [],
      e = function(a, b) { b = m.isFunction(b) ? b() : b == null ? '' : b, d[d.length] = encodeURIComponent(a) + '=' + encodeURIComponent(b); }; if (void 0 === b && (b = m.ajaxSettings && m.ajaxSettings.traditional), m.isArray(a) || a.jquery && !m.isPlainObject(a))m.each(a, function() { e(this.name, this.value); }); else for (c in a)Vc(c, a[c], b, e); return d.join('&').replace(Qc, '+');
  }, m.fn.extend({ serialize() { return m.param(this.serializeArray()); }, serializeArray() {
    return this.map(function() { const a = m.prop(this, 'elements'); return a ? m.makeArray(a) : this; }).filter(function() { const a = this.type; return this.name && !m(this).is(':disabled') && Uc.test(this.nodeName) && !Tc.test(a) && (this.checked || !W.test(a)); }).map(function(a, b) { const c = m(this).val(); return c == null ? null : m.isArray(c) ? m.map(c, function(a) { return { name: b.name, value: a.replace(Sc, '\r\n') }; }) : { name: b.name, value: c.replace(Sc, '\r\n') }; })
      .get();
  } }), m.ajaxSettings.xhr = void 0 !== a.ActiveXObject ? function() { return !this.isLocal && /^(get|post|head|put|delete|options)$/i.test(this.type) && Zc() || $c(); } : Zc; let Wc = 0,
    Xc = {},
    Yc = m.ajaxSettings.xhr(); a.ActiveXObject && m(a).on('unload', function() { for (const a in Xc)Xc[a](void 0, !0); }), k.cors = !!Yc && 'withCredentials' in Yc, Yc = k.ajax = !!Yc, Yc && m.ajaxTransport(function(a) {
    if (!a.crossDomain || k.cors) {
      let b; return { send(c, d) {
        let e,
          f = a.xhr(),
          g = ++Wc; if (f.open(a.type, a.url, a.async, a.username, a.password), a.xhrFields) for (e in a.xhrFields)f[e] = a.xhrFields[e]; a.mimeType && f.overrideMimeType && f.overrideMimeType(a.mimeType), a.crossDomain || c['X-Requested-With'] || (c['X-Requested-With'] = 'XMLHttpRequest'); for (e in c) void 0 !== c[e] && f.setRequestHeader(e, c[e] + ''); f.send(a.hasContent && a.data || null), b = function(c, e) {
          let h,
            i,
            j; if (b && (e || f.readyState === 4)) if (delete Xc[g], b = void 0, f.onreadystatechange = m.noop, e)f.readyState !== 4 && f.abort(); else { j = {}, h = f.status, typeof f.responseText === 'string' && (j.text = f.responseText); try { i = f.statusText; } catch (k) { i = ''; }h || !a.isLocal || a.crossDomain ? h === 1223 && (h = 204) : h = j.text ? 200 : 404; }j && d(h, i, j, f.getAllResponseHeaders());
        }, a.async ? f.readyState === 4 ? setTimeout(b) : f.onreadystatechange = Xc[g] = b : b();
      }, abort() { b && b(void 0, !0); } };
    }
  }); function Zc() { try { return new a.XMLHttpRequest(); } catch (b) {} } function $c() { try { return new a.ActiveXObject('Microsoft.XMLHTTP'); } catch (b) {} }m.ajaxSetup({ accepts: { script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript' }, contents: { script: /(?:java|ecma)script/ }, converters: { 'text script': function(a) { return m.globalEval(a), a; } } }), m.ajaxPrefilter('script', function(a) { void 0 === a.cache && (a.cache = !1), a.crossDomain && (a.type = 'GET', a.global = !1); }), m.ajaxTransport('script', function(a) {
    if (a.crossDomain) {
      let b,
        c = y.head || m('head')[0] || y.documentElement; return { send(d, e) { b = y.createElement('script'), b.async = !0, a.scriptCharset && (b.charset = a.scriptCharset), b.src = a.url, b.onload = b.onreadystatechange = function(a, c) { (c || !b.readyState || /loaded|complete/.test(b.readyState)) && (b.onload = b.onreadystatechange = null, b.parentNode && b.parentNode.removeChild(b), b = null, c || e(200, 'success')); }, c.insertBefore(b, c.firstChild); }, abort() { b && b.onload(void 0, !0); } };
    }
  }); const _c = [],
    ad = /(=)\?(?=&|$)|\?\?/; m.ajaxSetup({ jsonp: 'callback', jsonpCallback() { const a = _c.pop() || m.expando + '_' + vc++; return this[a] = !0, a; } }), m.ajaxPrefilter('json jsonp', function(b, c, d) {
    let e,
      f,
      g,
      h = b.jsonp !== !1 && (ad.test(b.url) ? 'url' : typeof b.data === 'string' && !(b.contentType || '').indexOf('application/x-www-form-urlencoded') && ad.test(b.data) && 'data'); return h || b.dataTypes[0] === 'jsonp' ? (e = b.jsonpCallback = m.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, h ? b[h] = b[h].replace(ad, '$1' + e) : b.jsonp !== !1 && (b.url += (wc.test(b.url) ? '&' : '?') + b.jsonp + '=' + e), b.converters['script json'] = function() { return g || m.error(e + ' was not called'), g[0]; }, b.dataTypes[0] = 'json', f = a[e], a[e] = function() { g = arguments; }, d.always(function() { a[e] = f, b[e] && (b.jsonpCallback = c.jsonpCallback, _c.push(e)), g && m.isFunction(f) && f(g[0]), g = f = void 0; }), 'script') : void 0;
  }), m.parseHTML = function(a, b, c) {
    if (!a || typeof a !== 'string') return null; typeof b === 'boolean' && (c = b, b = !1), b = b || y; let d = u.exec(a),
      e = !c && []; return d ? [ b.createElement(d[1]) ] : (d = m.buildFragment([ a ], b, e), e && e.length && m(e).remove(), m.merge([], d.childNodes));
  }; const bd = m.fn.load; m.fn.load = function(a, b, c) {
    if (typeof a !== 'string' && bd) return bd.apply(this, arguments); let d,
      e,
      f,
      g = this,
      h = a.indexOf(' '); return h >= 0 && (d = m.trim(a.slice(h, a.length)), a = a.slice(0, h)), m.isFunction(b) ? (c = b, b = void 0) : b && typeof b === 'object' && (f = 'POST'), g.length > 0 && m.ajax({ url: a, type: f, dataType: 'html', data: b }).done(function(a) { e = arguments, g.html(d ? m('<div>').append(m.parseHTML(a)).find(d) : a); }).complete(c && function(a, b) { g.each(c, e || [ a.responseText, b, a ]); }), this;
  }, m.expr.filters.animated = function(a) { return m.grep(m.timers, function(b) { return a === b.elem; }).length; }; const cd = a.document.documentElement; function dd(a) { return m.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1; }m.offset = { setOffset(a, b, c) {
    let d,
      e,
      f,
      g,
      h,
      i,
      j,
      k = m.css(a, 'position'),
      l = m(a),
      n = {}; k === 'static' && (a.style.position = 'relative'), h = l.offset(), f = m.css(a, 'top'), i = m.css(a, 'left'), j = (k === 'absolute' || k === 'fixed') && m.inArray('auto', [ f, i ]) > -1, j ? (d = l.position(), g = d.top, e = d.left) : (g = parseFloat(f) || 0, e = parseFloat(i) || 0), m.isFunction(b) && (b = b.call(a, c, h)), b.top != null && (n.top = b.top - h.top + g), b.left != null && (n.left = b.left - h.left + e), 'using' in b ? b.using.call(a, n) : l.css(n);
  } }, m.fn.extend({ offset(a) {
    if (arguments.length) return void 0 === a ? this : this.each(function(b) { m.offset.setOffset(this, a, b); }); let b,
      c,
      d = { top: 0, left: 0 },
      e = this[0],
      f = e && e.ownerDocument; if (f) return b = f.documentElement, m.contains(b, e) ? (typeof e.getBoundingClientRect !== K && (d = e.getBoundingClientRect()), c = dd(f), { top: d.top + (c.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: d.left + (c.pageXOffset || b.scrollLeft) - (b.clientLeft || 0) }) : d;
  }, position() {
    if (this[0]) {
      let a,
        b,
        c = { top: 0, left: 0 },
        d = this[0]; return m.css(d, 'position') === 'fixed' ? b = d.getBoundingClientRect() : (a = this.offsetParent(), b = this.offset(), m.nodeName(a[0], 'html') || (c = a.offset()), c.top += m.css(a[0], 'borderTopWidth', !0), c.left += m.css(a[0], 'borderLeftWidth', !0)), { top: b.top - c.top - m.css(d, 'marginTop', !0), left: b.left - c.left - m.css(d, 'marginLeft', !0) };
    }
  }, offsetParent() { return this.map(function() { let a = this.offsetParent || cd; while (a && !m.nodeName(a, 'html') && m.css(a, 'position') === 'static')a = a.offsetParent; return a || cd; }); } }), m.each({ scrollLeft: 'pageXOffset', scrollTop: 'pageYOffset' }, function(a, b) { const c = /Y/.test(b); m.fn[a] = function(d) { return V(this, function(a, d, e) { const f = dd(a); return void 0 === e ? f ? b in f ? f[b] : f.document.documentElement[d] : a[d] : void (f ? f.scrollTo(c ? m(f).scrollLeft() : e, c ? e : m(f).scrollTop()) : a[d] = e); }, a, d, arguments.length, null); }; }), m.each([ 'top', 'left' ], function(a, b) { m.cssHooks[b] = Lb(k.pixelPosition, function(a, c) { return c ? (c = Jb(a, b), Hb.test(c) ? m(a).position()[b] + 'px' : c) : void 0; }); }), m.each({ Height: 'height', Width: 'width' }, function(a, b) {
    m.each({ padding: 'inner' + a, content: b, '': 'outer' + a }, function(c, d) {
      m.fn[d] = function(d, e) {
        const f = arguments.length && (c || typeof d !== 'boolean'),
          g = c || (d === !0 || e === !0 ? 'margin' : 'border'); return V(this, function(b, c, d) { let e; return m.isWindow(b) ? b.document.documentElement['client' + a] : b.nodeType === 9 ? (e = b.documentElement, Math.max(b.body['scroll' + a], e['scroll' + a], b.body['offset' + a], e['offset' + a], e['client' + a])) : void 0 === d ? m.css(b, c, g) : m.style(b, c, d, g); }, b, f ? d : void 0, f, null);
      };
    });
  }), m.fn.size = function() { return this.length; }, m.fn.andSelf = m.fn.addBack, typeof define === 'function' && define.amd && define('jquery', [], function() { return m; }); const ed = a.jQuery,
    fd = a.$; return m.noConflict = function(b) { return a.$ === m && (a.$ = fd), b && a.jQuery === m && (a.jQuery = ed), m; }, typeof b === K && (a.jQuery = a.$ = m), m;
}); if (typeof define === 'function') { define(function() { return $.noConflict(); }); }
