// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror' ], mod); } else // Plain browser env
  { mod(CodeMirror); }
})(function(CodeMirror) {
  'use strict';

  const WORD = /[\w$]+/,
    RANGE = 500;

  CodeMirror.registerHelper('hint', 'anyword', function(editor, options) {
    const word = options && options.word || WORD;
    const range = options && options.range || RANGE;
    const cur = editor.getCursor(),
      curLine = editor.getLine(cur.line);
    let end = cur.ch,
      start = end;
    while (start && word.test(curLine.charAt(start - 1))) --start;
    const curWord = start != end && curLine.slice(start, end);

    const list = [],
      seen = {};
    const re = new RegExp(word.source, 'g');
    for (let dir = -1; dir <= 1; dir += 2) {
      let line = cur.line,
        endLine = Math.min(Math.max(line + dir * range, editor.firstLine()), editor.lastLine()) + dir;
      for (; line != endLine; line += dir) {
        var text = editor.getLine(line),
          m;
        while (m = re.exec(text)) {
          if (line == cur.line && m[0] === curWord) continue;
          if ((!curWord || m[0].lastIndexOf(curWord, 0) == 0) && !Object.prototype.hasOwnProperty.call(seen, m[0])) {
            seen[m[0]] = true;
            list.push(m[0]);
          }
        }
      }
    }
    return { list, from: CodeMirror.Pos(cur.line, start), to: CodeMirror.Pos(cur.line, end) };
  });
});
