// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror'), require('../htmlmixed/htmlmixed'), require('../ruby/ruby')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror', '../htmlmixed/htmlmixed', '../ruby/ruby' ], mod); } else // Plain browser env
  { mod(CodeMirror); }
})(function(CodeMirror) {
  'use strict';

  // full haml mode. This handled embeded ruby and html fragments too
  CodeMirror.defineMode('haml', function(config) {
    const htmlMode = CodeMirror.getMode(config, { name: 'htmlmixed' });
    const rubyMode = CodeMirror.getMode(config, 'ruby');

    function rubyInQuote(endQuote) {
      return function(stream, state) {
        const ch = stream.peek();
        if (ch == endQuote && state.rubyState.tokenize.length == 1) {
          // step out of ruby context as it seems to complete processing all the braces
          stream.next();
          state.tokenize = html;
          return 'closeAttributeTag';
        }
        return ruby(stream, state);

      };
    }

    function ruby(stream, state) {
      if (stream.match('-#')) {
        stream.skipToEnd();
        return 'comment';
      }
      return rubyMode.token(stream, state.rubyState);
    }

    function html(stream, state) {
      const ch = stream.peek();

      // handle haml declarations. All declarations that cant be handled here
      // will be passed to html mode
      if (state.previousToken.style == 'comment') {
        if (state.indented > state.previousToken.indented) {
          stream.skipToEnd();
          return 'commentLine';
        }
      }

      if (state.startOfLine) {
        if (ch == '!' && stream.match('!!')) {
          stream.skipToEnd();
          return 'tag';
        } else if (stream.match(/^%[\w:#\.]+=/)) {
          state.tokenize = ruby;
          return 'hamlTag';
        } else if (stream.match(/^%[\w:]+/)) {
          return 'hamlTag';
        } else if (ch == '/') {
          stream.skipToEnd();
          return 'comment';
        }
      }

      if (state.startOfLine || state.previousToken.style == 'hamlTag') {
        if (ch == '#' || ch == '.') {
          stream.match(/[\w-#\.]*/);
          return 'hamlAttribute';
        }
      }

      // donot handle --> as valid ruby, make it HTML close comment instead
      if (state.startOfLine && !stream.match('-->', false) && (ch == '=' || ch == '-')) {
        state.tokenize = ruby;
        return state.tokenize(stream, state);
      }

      if (state.previousToken.style == 'hamlTag' ||
          state.previousToken.style == 'closeAttributeTag' ||
          state.previousToken.style == 'hamlAttribute') {
        if (ch == '(') {
          state.tokenize = rubyInQuote(')');
          return state.tokenize(stream, state);
        } else if (ch == '{') {
          state.tokenize = rubyInQuote('}');
          return state.tokenize(stream, state);
        }
      }

      return htmlMode.token(stream, state.htmlState);
    }

    return {
      // default to html mode
      startState() {
        const htmlState = htmlMode.startState();
        const rubyState = rubyMode.startState();
        return {
          htmlState,
          rubyState,
          indented: 0,
          previousToken: { style: null, indented: 0 },
          tokenize: html,
        };
      },

      copyState(state) {
        return {
          htmlState: CodeMirror.copyState(htmlMode, state.htmlState),
          rubyState: CodeMirror.copyState(rubyMode, state.rubyState),
          indented: state.indented,
          previousToken: state.previousToken,
          tokenize: state.tokenize,
        };
      },

      token(stream, state) {
        if (stream.sol()) {
          state.indented = stream.indentation();
          state.startOfLine = true;
        }
        if (stream.eatSpace()) return null;
        let style = state.tokenize(stream, state);
        state.startOfLine = false;
        // dont record comment line as we only want to measure comment line with
        // the opening comment block
        if (style && style != 'commentLine') {
          state.previousToken = { style, indented: state.indented };
        }
        // if current state is ruby and the previous token is not `,` reset the
        // tokenize to html
        if (stream.eol() && state.tokenize == ruby) {
          stream.backUp(1);
          const ch = stream.peek();
          stream.next();
          if (ch && ch != ',') {
            state.tokenize = html;
          }
        }
        // reprocess some of the specific style tag when finish setting previousToken
        if (style == 'hamlTag') {
          style = 'tag';
        } else if (style == 'commentLine') {
          style = 'comment';
        } else if (style == 'hamlAttribute') {
          style = 'attribute';
        } else if (style == 'closeAttributeTag') {
          style = null;
        }
        return style;
      },
    };
  }, 'htmlmixed', 'ruby');

  CodeMirror.defineMIME('text/x-haml', 'haml');
});