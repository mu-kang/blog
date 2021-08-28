// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror' ], mod); } else // Plain browser env
  { mod(CodeMirror); }
})(function(CodeMirror) {
  'use strict';

  const Pos = CodeMirror.Pos;

  function getHints(cm, options) {
    const tags = options && options.schemaInfo;
    let quote = (options && options.quoteChar) || '"';
    if (!tags) return;
    const cur = cm.getCursor(),
      token = cm.getTokenAt(cur);
    if (token.end > cur.ch) {
      token.end = cur.ch;
      token.string = token.string.slice(0, cur.ch - token.start);
    }
    const inner = CodeMirror.innerMode(cm.getMode(), token.state);
    if (inner.mode.name != 'xml') return;
    let result = [],
      replaceToken = false,
      prefix;
    const tag = /\btag\b/.test(token.type) && !/>$/.test(token.string);
    let tagName = tag && /^\w/.test(token.string),
      tagStart;

    if (tagName) {
      var before = cm.getLine(cur.line).slice(Math.max(0, token.start - 2), token.start);
      var tagType = /<\/$/.test(before) ? 'close' : /<$/.test(before) ? 'open' : null;
      if (tagType) tagStart = token.start - (tagType == 'close' ? 2 : 1);
    } else if (tag && token.string == '<') {
      tagType = 'open';
    } else if (tag && token.string == '</') {
      tagType = 'close';
    }

    if (!tag && !inner.state.tagName || tagType) {
      if (tagName) { prefix = token.string; }
      replaceToken = tagType;
      var cx = inner.state.context,
        curTag = cx && tags[cx.tagName];
      const childList = cx ? curTag && curTag.children : tags['!top'];
      if (childList && tagType != 'close') {
        for (var i = 0; i < childList.length; ++i) {
          if (!prefix || childList[i].lastIndexOf(prefix, 0) == 0) { result.push('<' + childList[i]); }
        }
      } else if (tagType != 'close') {
        for (const name in tags) {
          if (tags.hasOwnProperty(name) && name != '!top' && name != '!attrs' && (!prefix || name.lastIndexOf(prefix, 0) == 0)) { result.push('<' + name); }
        }
      }
      if (cx && (!prefix || tagType == 'close' && cx.tagName.lastIndexOf(prefix, 0) == 0)) { result.push('</' + cx.tagName + '>'); }
    } else {
      // Attribute completion
      var curTag = tags[inner.state.tagName],
        attrs = curTag && curTag.attrs;
      const globalAttrs = tags['!attrs'];
      if (!attrs && !globalAttrs) return;
      if (!attrs) {
        attrs = globalAttrs;
      } else if (globalAttrs) { // Combine tag-local and global attributes
        const set = {};
        for (var nm in globalAttrs) if (globalAttrs.hasOwnProperty(nm)) set[nm] = globalAttrs[nm];
        for (var nm in attrs) if (attrs.hasOwnProperty(nm)) set[nm] = attrs[nm];
        attrs = set;
      }
      if (token.type == 'string' || token.string == '=') { // A value
        var before = cm.getRange(Pos(cur.line, Math.max(0, cur.ch - 60)),
          Pos(cur.line, token.type == 'string' ? token.start : token.end));
        let atName = before.match(/([^\s\u00a0=<>\"\']+)=$/),
          atValues;
        if (!atName || !attrs.hasOwnProperty(atName[1]) || !(atValues = attrs[atName[1]])) return;
        if (typeof atValues === 'function') atValues = atValues.call(this, cm); // Functions can be used to supply values for autocomplete widget
        if (token.type == 'string') {
          prefix = token.string;
          let n = 0;
          if (/['"]/.test(token.string.charAt(0))) {
            quote = token.string.charAt(0);
            prefix = token.string.slice(1);
            n++;
          }
          const len = token.string.length;
          if (/['"]/.test(token.string.charAt(len - 1))) {
            quote = token.string.charAt(len - 1);
            prefix = token.string.substr(n, len - 2);
          }
          replaceToken = true;
        }
        for (var i = 0; i < atValues.length; ++i) {
          if (!prefix || atValues[i].lastIndexOf(prefix, 0) == 0) { result.push(quote + atValues[i] + quote); }
        }
      } else { // An attribute name
        if (token.type == 'attribute') {
          prefix = token.string;
          replaceToken = true;
        }
        for (const attr in attrs) {
          if (attrs.hasOwnProperty(attr) && (!prefix || attr.lastIndexOf(prefix, 0) == 0)) { result.push(attr); }
        }
      }
    }
    return {
      list: result,
      from: replaceToken ? Pos(cur.line, tagStart == null ? token.start : tagStart) : cur,
      to: replaceToken ? Pos(cur.line, token.end) : cur,
    };
  }

  CodeMirror.registerHelper('hint', 'xml', getHints);
});
