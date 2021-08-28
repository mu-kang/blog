// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

/* Just enough of CodeMirror to run runMode under node.js */

// declare global: StringStream

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
exports.StringStream = StringStream;

exports.startState = function(mode, a1, a2) {
  return mode.startState ? mode.startState(a1, a2) : true;
};

const modes = exports.modes = {},
  mimeModes = exports.mimeModes = {};
exports.defineMode = function(name, mode) {
  if (arguments.length > 2) { mode.dependencies = Array.prototype.slice.call(arguments, 2); }
  modes[name] = mode;
};
exports.defineMIME = function(mime, spec) { mimeModes[mime] = spec; };

exports.defineMode('null', function() {
  return { token(stream) { stream.skipToEnd(); } };
});
exports.defineMIME('text/plain', 'null');

exports.resolveMode = function(spec) {
  if (typeof spec === 'string' && mimeModes.hasOwnProperty(spec)) {
    spec = mimeModes[spec];
  } else if (spec && typeof spec.name === 'string' && mimeModes.hasOwnProperty(spec.name)) {
    spec = mimeModes[spec.name];
  }
  if (typeof spec === 'string') return { name: spec };
  return spec || { name: 'null' };
};
exports.getMode = function(options, spec) {
  spec = exports.resolveMode(spec);
  const mfactory = modes[spec.name];
  if (!mfactory) throw new Error('Unknown mode: ' + spec);
  return mfactory(options, spec);
};
exports.registerHelper = exports.registerGlobalHelper = Math.min;

exports.runMode = function(string, modespec, callback, options) {
  const mode = exports.getMode({ indentUnit: 2 }, modespec);
  const lines = splitLines(string),
    state = (options && options.state) || exports.startState(mode);
  for (let i = 0, e = lines.length; i < e; ++i) {
    if (i) callback('\n');
    const stream = new exports.StringStream(lines[i]);
    if (!stream.string && mode.blankLine) mode.blankLine(state);
    while (!stream.eol()) {
      const style = mode.token(stream, state);
      callback(stream.current(), style, i, stream.start, state);
      stream.start = stream.pos;
    }
  }
};

require.cache[require.resolve('../../lib/codemirror')] = require.cache[require.resolve('./runmode.node')];
