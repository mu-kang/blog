// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror'), require('../xml/xml'), require('../javascript/javascript'), require('../css/css')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror', '../xml/xml', '../javascript/javascript', '../css/css' ], mod); } else // Plain browser env
  { mod(CodeMirror); }
})(function(CodeMirror) {
  'use strict';

  CodeMirror.defineMode('htmlmixed', function(config, parserConfig) {
    const htmlMode = CodeMirror.getMode(config, { name: 'xml',
      htmlMode: true,
      multilineTagIndentFactor: parserConfig.multilineTagIndentFactor,
      multilineTagIndentPastTag: parserConfig.multilineTagIndentPastTag });
    const cssMode = CodeMirror.getMode(config, 'css');

    const scriptTypes = [],
      scriptTypesConf = parserConfig && parserConfig.scriptTypes;
    scriptTypes.push({ matches: /^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^$/i,
      mode: CodeMirror.getMode(config, 'javascript') });
    if (scriptTypesConf) {
      for (let i = 0; i < scriptTypesConf.length; ++i) {
        const conf = scriptTypesConf[i];
        scriptTypes.push({ matches: conf.matches, mode: conf.mode && CodeMirror.getMode(config, conf.mode) });
      }
    }
    scriptTypes.push({ matches: /./,
      mode: CodeMirror.getMode(config, 'text/plain') });

    function html(stream, state) {
      let tagName = state.htmlState.tagName;
      if (tagName) tagName = tagName.toLowerCase();
      const style = htmlMode.token(stream, state.htmlState);
      if (tagName == 'script' && /\btag\b/.test(style) && stream.current() == '>') {
      // Script block: mode to change to depends on type attribute
        let scriptType = stream.string.slice(Math.max(0, stream.pos - 100), stream.pos).match(/\btype\s*=\s*("[^"]+"|'[^']+'|\S+)[^<]*$/i);
        scriptType = scriptType ? scriptType[1] : '';
        if (scriptType && /[\"\']/.test(scriptType.charAt(0))) scriptType = scriptType.slice(1, scriptType.length - 1);
        for (let i = 0; i < scriptTypes.length; ++i) {
          const tp = scriptTypes[i];
          if (typeof tp.matches === 'string' ? scriptType == tp.matches : tp.matches.test(scriptType)) {
            if (tp.mode) {
              state.token = script;
              state.localMode = tp.mode;
              state.localState = tp.mode.startState && tp.mode.startState(htmlMode.indent(state.htmlState, ''));
            }
            break;
          }
        }
      } else if (tagName == 'style' && /\btag\b/.test(style) && stream.current() == '>') {
        state.token = css;
        state.localMode = cssMode;
        state.localState = cssMode.startState(htmlMode.indent(state.htmlState, ''));
      }
      return style;
    }
    function maybeBackup(stream, pat, style) {
      const cur = stream.current();
      let close = cur.search(pat),
        m;
      if (close > -1) stream.backUp(cur.length - close);
      else if (m = cur.match(/<\/?$/)) {
        stream.backUp(cur.length);
        if (!stream.match(pat, false)) stream.match(cur);
      }
      return style;
    }
    function script(stream, state) {
      if (stream.match(/^<\/\s*script\s*>/i, false)) {
        state.token = html;
        state.localState = state.localMode = null;
        return null;
      }
      return maybeBackup(stream, /<\/\s*script\s*>/,
        state.localMode.token(stream, state.localState));
    }
    function css(stream, state) {
      if (stream.match(/^<\/\s*style\s*>/i, false)) {
        state.token = html;
        state.localState = state.localMode = null;
        return null;
      }
      return maybeBackup(stream, /<\/\s*style\s*>/,
        cssMode.token(stream, state.localState));
    }

    return {
      startState() {
        const state = htmlMode.startState();
        return { token: html, localMode: null, localState: null, htmlState: state };
      },

      copyState(state) {
        if (state.localState) { var local = CodeMirror.copyState(state.localMode, state.localState); }
        return { token: state.token, localMode: state.localMode, localState: local,
          htmlState: CodeMirror.copyState(htmlMode, state.htmlState) };
      },

      token(stream, state) {
        return state.token(stream, state);
      },

      indent(state, textAfter) {
        if (!state.localMode || /^\s*<\//.test(textAfter)) { return htmlMode.indent(state.htmlState, textAfter); } else if (state.localMode.indent) { return state.localMode.indent(state.localState, textAfter); }
        return CodeMirror.Pass;
      },

      innerMode(state) {
        return { state: state.localState || state.htmlState, mode: state.localMode || htmlMode };
      },
    };
  }, 'xml', 'javascript', 'css');

  CodeMirror.defineMIME('text/html', 'htmlmixed');

});
