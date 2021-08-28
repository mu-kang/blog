// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror'), require('../../mode/sql/sql')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror', '../../mode/sql/sql' ], mod); } else // Plain browser env
  { mod(CodeMirror); }
})(function(CodeMirror) {
  'use strict';

  let tables;
  let defaultTable;
  let keywords;
  const CONS = {
    QUERY_DIV: ';',
    ALIAS_KEYWORD: 'AS',
  };
  const Pos = CodeMirror.Pos;

  function getKeywords(editor) {
    let mode = editor.doc.modeOption;
    if (mode === 'sql') mode = 'text/x-sql';
    return CodeMirror.resolveMode(mode).keywords;
  }

  function getText(item) {
    return typeof item === 'string' ? item : item.text;
  }

  function getItem(list, item) {
    if (!list.slice) return list[item];
    for (let i = list.length - 1; i >= 0; i--) {
      if (getText(list[i]) == item) { return list[i]; }
    }
  }

  function shallowClone(object) {
    const result = {};
    for (const key in object) {
      if (object.hasOwnProperty(key)) { result[key] = object[key]; }
    }
    return result;
  }

  function match(string, word) {
    const len = string.length;
    const sub = getText(word).substr(0, len);
    return string.toUpperCase() === sub.toUpperCase();
  }

  function addMatches(result, search, wordlist, formatter) {
    for (let word in wordlist) {
      if (!wordlist.hasOwnProperty(word)) continue;
      if (Array.isArray(wordlist)) {
        word = wordlist[word];
      }
      if (match(search, word)) {
        result.push(formatter(word));
      }
    }
  }

  function cleanName(name) {
    // Get rid name from backticks(`) and preceding dot(.)
    if (name.charAt(0) == '.') {
      name = name.substr(1);
    }
    return name.replace(/`/g, '');
  }

  function insertBackticks(name) {
    const nameParts = getText(name).split('.');
    for (let i = 0; i < nameParts.length; i++) { nameParts[i] = '`' + nameParts[i] + '`'; }
    const escaped = nameParts.join('.');
    if (typeof name === 'string') return escaped;
    name = shallowClone(name);
    name.text = escaped;
    return name;
  }

  function nameCompletion(cur, token, result, editor) {
    // Try to complete table, colunm names and return start position of completion
    let useBacktick = false;
    const nameParts = [];
    let start = token.start;
    let cont = true;
    while (cont) {
      cont = (token.string.charAt(0) == '.');
      useBacktick = useBacktick || (token.string.charAt(0) == '`');

      start = token.start;
      nameParts.unshift(cleanName(token.string));

      token = editor.getTokenAt(Pos(cur.line, token.start));
      if (token.string == '.') {
        cont = true;
        token = editor.getTokenAt(Pos(cur.line, token.start));
      }
    }

    // Try to complete table names
    let string = nameParts.join('.');
    addMatches(result, string, tables, function(w) {
      return useBacktick ? insertBackticks(w) : w;
    });

    // Try to complete columns from defaultTable
    addMatches(result, string, defaultTable, function(w) {
      return useBacktick ? insertBackticks(w) : w;
    });

    // Try to complete columns
    string = nameParts.pop();
    let table = nameParts.join('.');

    // Check if table is available. If not, find table by Alias
    if (!getItem(tables, table)) { table = findTableByAlias(table, editor); }

    let columns = getItem(tables, table);
    if (columns && Array.isArray(tables) && columns.columns) { columns = columns.columns; }

    if (columns) {
      addMatches(result, string, columns, function(w) {
        if (typeof w === 'string') {
          w = table + '.' + w;
        } else {
          w = shallowClone(w);
          w.text = table + '.' + w.text;
        }
        return useBacktick ? insertBackticks(w) : w;
      });
    }

    return start;
  }

  function eachWord(lineText, f) {
    if (!lineText) return;
    const excepted = /[,;]/g;
    const words = lineText.split(' ');
    for (let i = 0; i < words.length; i++) {
      f(words[i] ? words[i].replace(excepted, '') : '');
    }
  }

  function convertCurToNumber(cur) {
    // max characters of a line is 999,999.
    return cur.line + cur.ch / Math.pow(10, 6);
  }

  function convertNumberToCur(num) {
    return Pos(Math.floor(num), +num.toString().split('.').pop());
  }

  function findTableByAlias(alias, editor) {
    const doc = editor.doc;
    const fullQuery = doc.getValue();
    const aliasUpperCase = alias.toUpperCase();
    let previousWord = '';
    let table = '';
    const separator = [];
    let validRange = {
      start: Pos(0, 0),
      end: Pos(editor.lastLine(), editor.getLineHandle(editor.lastLine()).length),
    };

    // add separator
    let indexOfSeparator = fullQuery.indexOf(CONS.QUERY_DIV);
    while (indexOfSeparator != -1) {
      separator.push(doc.posFromIndex(indexOfSeparator));
      indexOfSeparator = fullQuery.indexOf(CONS.QUERY_DIV, indexOfSeparator + 1);
    }
    separator.unshift(Pos(0, 0));
    separator.push(Pos(editor.lastLine(), editor.getLineHandle(editor.lastLine()).text.length));

    // find valid range
    let prevItem = 0;
    const current = convertCurToNumber(editor.getCursor());
    for (var i = 0; i < separator.length; i++) {
      const _v = convertCurToNumber(separator[i]);
      if (current > prevItem && current <= _v) {
        validRange = { start: convertNumberToCur(prevItem), end: convertNumberToCur(_v) };
        break;
      }
      prevItem = _v;
    }

    const query = doc.getRange(validRange.start, validRange.end, false);

    for (var i = 0; i < query.length; i++) {
      const lineText = query[i];
      eachWord(lineText, function(word) {
        const wordUpperCase = word.toUpperCase();
        if (wordUpperCase === aliasUpperCase && getItem(tables, previousWord)) { table = previousWord; }
        if (wordUpperCase !== CONS.ALIAS_KEYWORD) { previousWord = word; }
      });
      if (table) break;
    }
    return table;
  }

  CodeMirror.registerHelper('hint', 'sql', function(editor, options) {
    tables = (options && options.tables) || {};
    const defaultTableName = options && options.defaultTable;
    defaultTable = (defaultTableName && getItem(tables, defaultTableName)) || [];
    keywords = keywords || getKeywords(editor);

    const cur = editor.getCursor();
    const result = [];
    let token = editor.getTokenAt(cur),
      start,
      end,
      search;
    if (token.end > cur.ch) {
      token.end = cur.ch;
      token.string = token.string.slice(0, cur.ch - token.start);
    }

    if (token.string.match(/^[.`\w@]\w*$/)) {
      search = token.string;
      start = token.start;
      end = token.end;
    } else {
      start = end = cur.ch;
      search = '';
    }
    if (search.charAt(0) == '.' || search.charAt(0) == '`') {
      start = nameCompletion(cur, token, result, editor);
    } else {
      addMatches(result, search, tables, function(w) { return w; });
      addMatches(result, search, defaultTable, function(w) { return w; });
      addMatches(result, search, keywords, function(w) { return w.toUpperCase(); });
    }

    return { list: result, from: Pos(cur.line, start), to: Pos(cur.line, end) };
  });
});
