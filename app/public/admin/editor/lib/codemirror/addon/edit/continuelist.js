// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror' ], mod); } else // Plain browser env
  { mod(CodeMirror); }
})(function(CodeMirror) {
  'use strict';

  const listRE = /^(\s*)(>[> ]*|[*+-]\s|(\d+)\.)(\s*)/,
    emptyListRE = /^(\s*)(>[> ]*|[*+-]|(\d+)\.)(\s*)$/,
    unorderedListRE = /[*+-]\s/;

  CodeMirror.commands.newlineAndIndentContinueMarkdownList = function(cm) {
    if (cm.getOption('disableInput')) return CodeMirror.Pass;
    const ranges = cm.listSelections(),
      replacements = [];
    for (let i = 0; i < ranges.length; i++) {
      var pos = ranges[i].head,
        match;
      const eolState = cm.getStateAfter(pos.line);
      const inList = eolState.list !== false;
      const inQuote = eolState.quote !== false;

      if (!ranges[i].empty() || (!inList && !inQuote) || !(match = cm.getLine(pos.line).match(listRE))) {
        cm.execCommand('newlineAndIndent');
        return;
      }
      if (cm.getLine(pos.line).match(emptyListRE)) {
        cm.replaceRange('', {
          line: pos.line, ch: 0,
        }, {
          line: pos.line, ch: pos.ch + 1,
        });
        replacements[i] = '\n';

      } else {
        const indent = match[1],
          after = match[4];
        const bullet = unorderedListRE.test(match[2]) || match[2].indexOf('>') >= 0
          ? match[2]
          : (parseInt(match[3], 10) + 1) + '.';

        replacements[i] = '\n' + indent + bullet + after;
      }
    }

    cm.replaceSelections(replacements);
  };
});
