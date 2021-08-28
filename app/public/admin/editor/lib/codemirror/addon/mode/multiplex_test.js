// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function() {
  CodeMirror.defineMode('markdown_with_stex', function() {
    const inner = CodeMirror.getMode({}, 'stex');
    const outer = CodeMirror.getMode({}, 'markdown');

    const innerOptions = {
      open: '$',
      close: '$',
      mode: inner,
      delimStyle: 'delim',
      innerStyle: 'inner',
    };

    return CodeMirror.multiplexingMode(outer, innerOptions);
  });

  const mode = CodeMirror.getMode({}, 'markdown_with_stex');

  function MT(name) {
    test.mode(
      name,
      mode,
      Array.prototype.slice.call(arguments, 1),
      'multiplexing');
  }

  MT(
    'stexInsideMarkdown',
    '[strong **Equation:**] [delim $][inner&tag \\pi][delim $]');
})();
