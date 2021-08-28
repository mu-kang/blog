// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

window.CodeMirror = {};

(function() {
  'use strict';

  function splitLines(string) { return string.split(/\r?\n|\r/); }

  function StringStream(string) {
    this.pos = this.start = 0;
    this.string = string;
    this.lineStart = 0;
  }
  StringStream.prototype = {
    eol() { return this.pos >= this.string.length; },
    sol() { return this.pos == 0; },
    peek() { return this.string.charAt(this.pos) || null; },
    next() {
      if (this.pos < this.string.length) { return this.string.charAt(this.pos++); }
    },
    eat(match) {
      const ch = this.string.charAt(this.pos);
      if (typeof match === 'string') var ok = ch == match;
      else var ok = ch && (match.test ? match.test(ch) : match(ch));
      if (ok) { ++this.pos; return ch; }
    },
    eatWhile(match) {
      const start = this.pos;
      while (this.eat(match)) {}
      return this.pos > start;
    },
    eatSpace() {
      const start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
      return this.pos > start;
    },
    skipToEnd() { this.pos = this.string.length; },
    skipTo(ch) {
      const found = this.string.indexOf(ch, this.pos);
      if (found > -1) { this.pos = found; return true; }
    },
    backUp(n) { this.pos -= n; },
    column() { return this.start - this.lineStart; },
    indentation() { return 0; },
    match(pattern, consume, caseInsensitive) {
      if (typeof pattern === 'string') {
        const cased = function(str) { return caseInsensitive ? str.toLowerCase() : str; };
        const substr = this.string.substr(this.pos, pattern.length);
        if (cased(substr) == cased(pattern)) {
          if (consume !== false) this.pos += pattern.length;
          return true;
        }
      } else {
        const match = this.string.slice(this.pos).match(pattern);
        if (match && match.index > 0) return null;
        if (match && consume !== false) this.pos += match[0].length;
        return match;
      }
    },
    current() { return this.string.slice(this.start, this.pos); },
    hideFirstChars(n, inner) {
      this.lineStart += n;
      try { return inner(); } finally { this.lineStart -= n; }
    },
  };
  CodeMirror.StringStream = StringStream;

  CodeMirror.startState = function(mode, a1, a2) {
    return mode.startState ? mode.startState(a1, a2) : true;
  };

  const modes = CodeMirror.modes = {},
    mimeModes = CodeMirror.mimeModes = {};
  CodeMirror.defineMode = function(name, mode) {
    if (arguments.length > 2) { mode.dependencies = Array.prototype.slice.call(arguments, 2); }
    modes[name] = mode;
  };
  CodeMirror.defineMIME = function(mime, spec) { mimeModes[mime] = spec; };
  CodeMirror.resolveMode = function(spec) {
    if (typeof spec === 'string' && mimeModes.hasOwnProperty(spec)) {
      spec = mimeModes[spec];
    } else if (spec && typeof spec.name === 'string' && mimeModes.hasOwnProperty(spec.name)) {
      spec = mimeModes[spec.name];
    }
    if (typeof spec === 'string') return { name: spec };
    return spec || { name: 'null' };
  };
  CodeMirror.getMode = function(options, spec) {
    spec = CodeMirror.resolveMode(spec);
    const mfactory = modes[spec.name];
    if (!mfactory) throw new Error('Unknown mode: ' + spec);
    return mfactory(options, spec);
  };
  CodeMirror.registerHelper = CodeMirror.registerGlobalHelper = Math.min;
  CodeMirror.defineMode('null', function() {
    return { token(stream) { stream.skipToEnd(); } };
  });
  CodeMirror.defineMIME('text/plain', 'null');

  CodeMirror.runMode = function(string, modespec, callback, options) {
    const mode = CodeMirror.getMode({ indentUnit: 2 }, modespec);

    if (callback.nodeType == 1) {
      const tabSize = (options && options.tabSize) || 4;
      let node = callback,
        col = 0;
      node.innerHTML = '';
      callback = function(text, style) {
        if (text == '\n') {
          node.appendChild(document.createElement('br'));
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

    const lines = splitLines(string),
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
})();
