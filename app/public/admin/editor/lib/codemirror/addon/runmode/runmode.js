// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror' ], mod); } else // Plain browser env
  { mod(CodeMirror); }
})(function(CodeMirror) {
  'use strict';

  CodeMirror.runMode = function(string, modespec, callback, options) {
    const mode = CodeMirror.getMode(CodeMirror.defaults, modespec);
    const ie = /MSIE \d/.test(navigator.userAgent);
    const ie_lt9 = ie && (document.documentMode == null || document.documentMode < 9);

    if (callback.nodeType == 1) {
      const tabSize = (options && options.tabSize) || CodeMirror.defaults.tabSize;
      let node = callback,
        col = 0;
      node.innerHTML = '';
      callback = function(text, style) {
        if (text == '\n') {
        // Emitting LF or CRLF on IE8 or earlier results in an incorrect display.
        // Emitting a carriage return makes everything ok.
          node.appendChild(document.createTextNode(ie_lt9 ? '\r' : text));
          col = 0;
          return;
        }
        let content = '';
        // replace tabs
        for (let pos = 0; ;) {
          const idx = text.indexOf('\t', pos);
          if (idx == -1) {
            content += text.slice(pos);
            col += text.length - pos;
            break;
          } else {
            col += idx - pos;
            content += text.slice(pos, idx);
            const size = tabSize - col % tabSize;
            col += size;
            for (let i = 0; i < size; ++i) content += ' ';
            pos = idx + 1;
          }
        }

        if (style) {
          const sp = node.appendChild(document.createElement('span'));
          sp.className = 'cm-' + style.replace(/ +/g, ' cm-');
          sp.appendChild(document.createTextNode(content));
        } else {
          node.appendChild(document.createTextNode(content));
        }
      };
    }

    const lines = CodeMirror.splitLines(string),
      state = (options && options.state) || CodeMirror.startState(mode);
    for (let i = 0, e = lines.length; i < e; ++i) {
      if (i) callback('\n');
      const stream = new CodeMirror.StringStream(lines[i]);
      if (!stream.string && mode.blankLine) mode.blankLine(state);
      while (!stream.eol()) {
        const style = mode.token(stream, state);
        callback(stream.current(), style, i, stream.start, state);
        stream.start = stream.pos;
      }
    }
  };

});
