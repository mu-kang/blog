// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// Depends on csslint.js from https://github.com/stubbornella/csslint

// declare global: CSSLint

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror' ], mod); } else // Plain browser env
  { mod(CodeMirror); }
})(function(CodeMirror) {
  'use strict';

  CodeMirror.registerHelper('lint', 'css', function(text) {
    const found = [];
    if (!window.CSSLint) return found;
    let results = CSSLint.verify(text),
      messages = results.messages,
      message = null;
    for (let i = 0; i < messages.length; i++) {
      message = messages[i];
      const startLine = message.line - 1,
        endLine = message.line - 1,
        startCol = message.col - 1,
        endCol = message.col;
      found.push({
        from: CodeMirror.Pos(startLine, startCol),
        to: CodeMirror.Pos(endLine, endCol),
        message: message.message,
        severity: message.type,
      });
    }
    return found;
  });

});
