// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror' ], mod); } else // Plain browser env
  { mod(CodeMirror); }
})(function(CodeMirror) {
  'use strict';

  const HINT_ELEMENT_CLASS = 'CodeMirror-hint';
  const ACTIVE_HINT_ELEMENT_CLASS = 'CodeMirror-hint-active';

  // This is the old interface, kept around for now to stay
  // backwards-compatible.
  CodeMirror.showHint = function(cm, getHints, options) {
    if (!getHints) return cm.showHint(options);
    if (options && options.async) getHints.async = true;
    const newOpts = { hint: getHints };
    if (options) for (const prop in options) newOpts[prop] = options[prop];
    return cm.showHint(newOpts);
  };

  let asyncRunID = 0;
  function retrieveHints(getter, cm, options, then) {
    if (getter.async) {
      const id = ++asyncRunID;
      getter(cm, function(hints) {
        if (asyncRunID == id) then(hints);
      }, options);
    } else {
      then(getter(cm, options));
    }
  }

  CodeMirror.defineExtension('showHint', function(options) {
    // We want a single cursor position.
    if (this.listSelections().length > 1 || this.somethingSelected()) return;

    if (this.state.completionActive) this.state.completionActive.close();
    const completion = this.state.completionActive = new Completion(this, options);
    const getHints = completion.options.hint;
    if (!getHints) return;

    CodeMirror.signal(this, 'startCompletion', this);
    return retrieveHints(getHints, this, completion.options, function(hints) { completion.showHints(hints); });
  });

  function Completion(cm, options) {
    this.cm = cm;
    this.options = this.buildOptions(options);
    this.widget = this.onClose = null;
  }

  Completion.prototype = {
    close() {
      if (!this.active()) return;
      this.cm.state.completionActive = null;

      if (this.widget) this.widget.close();
      if (this.onClose) this.onClose();
      CodeMirror.signal(this.cm, 'endCompletion', this.cm);
    },

    active() {
      return this.cm.state.completionActive == this;
    },

    pick(data, i) {
      const completion = data.list[i];
      if (completion.hint) completion.hint(this.cm, data, completion);
      else {
        this.cm.replaceRange(getText(completion), completion.from || data.from,
          completion.to || data.to, 'complete');
      }
      CodeMirror.signal(data, 'pick', completion);
      this.close();
    },

    showHints(data) {
      if (!data || !data.list.length || !this.active()) return this.close();

      if (this.options.completeSingle && data.list.length == 1) { this.pick(data, 0); } else { this.showWidget(data); }
    },

    showWidget(data) {
      this.widget = new Widget(this, data);
      CodeMirror.signal(data, 'shown');

      let debounce = 0,
        completion = this,
        finished;
      const closeOn = this.options.closeCharacters;
      const startPos = this.cm.getCursor(),
        startLen = this.cm.getLine(startPos.line).length;

      const requestAnimationFrame = window.requestAnimationFrame || function(fn) {
        return setTimeout(fn, 1000 / 60);
      };
      const cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;

      function done() {
        if (finished) return;
        finished = true;
        completion.close();
        completion.cm.off('cursorActivity', activity);
        if (data) CodeMirror.signal(data, 'close');
      }

      function update() {
        if (finished) return;
        CodeMirror.signal(data, 'update');
        retrieveHints(completion.options.hint, completion.cm, completion.options, finishUpdate);
      }
      function finishUpdate(data_) {
        data = data_;
        if (finished) return;
        if (!data || !data.list.length) return done();
        if (completion.widget) completion.widget.close();
        completion.widget = new Widget(completion, data);
      }

      function clearDebounce() {
        if (debounce) {
          cancelAnimationFrame(debounce);
          debounce = 0;
        }
      }

      function activity() {
        clearDebounce();
        const pos = completion.cm.getCursor(),
          line = completion.cm.getLine(pos.line);
        if (pos.line != startPos.line || line.length - pos.ch != startLen - startPos.ch ||
            pos.ch < startPos.ch || completion.cm.somethingSelected() ||
            (pos.ch && closeOn.test(line.charAt(pos.ch - 1)))) {
          completion.close();
        } else {
          debounce = requestAnimationFrame(update);
          if (completion.widget) completion.widget.close();
        }
      }
      this.cm.on('cursorActivity', activity);
      this.onClose = done;
    },

    buildOptions(options) {
      const editor = this.cm.options.hintOptions;
      const out = {};
      for (var prop in defaultOptions) out[prop] = defaultOptions[prop];
      if (editor) {
        for (var prop in editor) { if (editor[prop] !== undefined) out[prop] = editor[prop]; }
      }
      if (options) {
        for (var prop in options) { if (options[prop] !== undefined) out[prop] = options[prop]; }
      }
      return out;
    },
  };

  function getText(completion) {
    if (typeof completion === 'string') return completion;
    return completion.text;
  }

  function buildKeyMap(completion, handle) {
    const baseMap = {
      Up() { handle.moveFocus(-1); },
      Down() { handle.moveFocus(1); },
      PageUp() { handle.moveFocus(-handle.menuSize() + 1, true); },
      PageDown() { handle.moveFocus(handle.menuSize() - 1, true); },
      Home() { handle.setFocus(0); },
      End() { handle.setFocus(handle.length - 1); },
      Enter: handle.pick,
      Tab: handle.pick,
      Esc: handle.close,
    };
    const custom = completion.options.customKeys;
    const ourMap = custom ? {} : baseMap;
    function addBinding(key, val) {
      let bound;
      if (typeof val !== 'string') { bound = function(cm) { return val(cm, handle); }; }
      // This mechanism is deprecated
      else if (baseMap.hasOwnProperty(val)) { bound = baseMap[val]; } else { bound = val; }
      ourMap[key] = bound;
    }
    if (custom) {
      for (var key in custom) {
        if (custom.hasOwnProperty(key)) { addBinding(key, custom[key]); }
      }
    }
    const extra = completion.options.extraKeys;
    if (extra) {
      for (var key in extra) {
        if (extra.hasOwnProperty(key)) { addBinding(key, extra[key]); }
      }
    }
    return ourMap;
  }

  function getHintElement(hintsElement, el) {
    while (el && el != hintsElement) {
      if (el.nodeName.toUpperCase() === 'LI' && el.parentNode == hintsElement) return el;
      el = el.parentNode;
    }
  }

  function Widget(completion, data) {
    this.completion = completion;
    this.data = data;
    const widget = this,
      cm = completion.cm;

    const hints = this.hints = document.createElement('ul');
    hints.className = 'CodeMirror-hints';
    this.selectedHint = data.selectedHint || 0;

    const completions = data.list;
    for (let i = 0; i < completions.length; ++i) {
      const elt = hints.appendChild(document.createElement('li')),
        cur = completions[i];
      let className = HINT_ELEMENT_CLASS + (i != this.selectedHint ? '' : ' ' + ACTIVE_HINT_ELEMENT_CLASS);
      if (cur.className != null) className = cur.className + ' ' + className;
      elt.className = className;
      if (cur.render) cur.render(elt, data, cur);
      else elt.appendChild(document.createTextNode(cur.displayText || getText(cur)));
      elt.hintId = i;
    }

    let pos = cm.cursorCoords(completion.options.alignWithWord ? data.from : null);
    let left = pos.left,
      top = pos.bottom,
      below = true;
    hints.style.left = left + 'px';
    hints.style.top = top + 'px';
    // If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
    const winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
    const winH = window.innerHeight || Math.max(document.body.offsetHeight, document.documentElement.offsetHeight);
    (completion.options.container || document.body).appendChild(hints);
    let box = hints.getBoundingClientRect(),
      overlapY = box.bottom - winH;
    if (overlapY > 0) {
      const height = box.bottom - box.top,
        curTop = pos.top - (pos.bottom - box.top);
      if (curTop - height > 0) { // Fits above cursor
        hints.style.top = (top = pos.top - height) + 'px';
        below = false;
      } else if (height > winH) {
        hints.style.height = (winH - 5) + 'px';
        hints.style.top = (top = pos.bottom - box.top) + 'px';
        const cursor = cm.getCursor();
        if (data.from.ch != cursor.ch) {
          pos = cm.cursorCoords(cursor);
          hints.style.left = (left = pos.left) + 'px';
          box = hints.getBoundingClientRect();
        }
      }
    }
    let overlapX = box.right - winW;
    if (overlapX > 0) {
      if (box.right - box.left > winW) {
        hints.style.width = (winW - 5) + 'px';
        overlapX -= (box.right - box.left) - winW;
      }
      hints.style.left = (left = pos.left - overlapX) + 'px';
    }

    cm.addKeyMap(this.keyMap = buildKeyMap(completion, {
      moveFocus(n, avoidWrap) { widget.changeActive(widget.selectedHint + n, avoidWrap); },
      setFocus(n) { widget.changeActive(n); },
      menuSize() { return widget.screenAmount(); },
      length: completions.length,
      close() { completion.close(); },
      pick() { widget.pick(); },
      data,
    }));

    if (completion.options.closeOnUnfocus) {
      let closingOnBlur;
      cm.on('blur', this.onBlur = function() { closingOnBlur = setTimeout(function() { completion.close(); }, 100); });
      cm.on('focus', this.onFocus = function() { clearTimeout(closingOnBlur); });
    }

    const startScroll = cm.getScrollInfo();
    cm.on('scroll', this.onScroll = function() {
      const curScroll = cm.getScrollInfo(),
        editor = cm.getWrapperElement().getBoundingClientRect();
      const newTop = top + startScroll.top - curScroll.top;
      let point = newTop - (window.pageYOffset || (document.documentElement || document.body).scrollTop);
      if (!below) point += hints.offsetHeight;
      if (point <= editor.top || point >= editor.bottom) return completion.close();
      hints.style.top = newTop + 'px';
      hints.style.left = (left + startScroll.left - curScroll.left) + 'px';
    });

    CodeMirror.on(hints, 'dblclick', function(e) {
      const t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) { widget.changeActive(t.hintId); widget.pick(); }
    });

    CodeMirror.on(hints, 'click', function(e) {
      const t = getHintElement(hints, e.target || e.srcElement);
      if (t && t.hintId != null) {
        widget.changeActive(t.hintId);
        if (completion.options.completeOnSingleClick) widget.pick();
      }
    });

    CodeMirror.on(hints, 'mousedown', function() {
      setTimeout(function() { cm.focus(); }, 20);
    });

    CodeMirror.signal(data, 'select', completions[0], hints.firstChild);
    return true;
  }

  Widget.prototype = {
    close() {
      if (this.completion.widget != this) return;
      this.completion.widget = null;
      this.hints.parentNode.removeChild(this.hints);
      this.completion.cm.removeKeyMap(this.keyMap);

      const cm = this.completion.cm;
      if (this.completion.options.closeOnUnfocus) {
        cm.off('blur', this.onBlur);
        cm.off('focus', this.onFocus);
      }
      cm.off('scroll', this.onScroll);
    },

    pick() {
      this.completion.pick(this.data, this.selectedHint);
    },

    changeActive(i, avoidWrap) {
      if (i >= this.data.list.length) { i = avoidWrap ? this.data.list.length - 1 : 0; } else if (i < 0) { i = avoidWrap ? 0 : this.data.list.length - 1; }
      if (this.selectedHint == i) return;
      let node = this.hints.childNodes[this.selectedHint];
      node.className = node.className.replace(' ' + ACTIVE_HINT_ELEMENT_CLASS, '');
      node = this.hints.childNodes[this.selectedHint = i];
      node.className += ' ' + ACTIVE_HINT_ELEMENT_CLASS;
      if (node.offsetTop < this.hints.scrollTop) { this.hints.scrollTop = node.offsetTop - 3; } else if (node.offsetTop + node.offsetHeight > this.hints.scrollTop + this.hints.clientHeight) { this.hints.scrollTop = node.offsetTop + node.offsetHeight - this.hints.clientHeight + 3; }
      CodeMirror.signal(this.data, 'select', this.data.list[this.selectedHint], node);
    },

    screenAmount() {
      return Math.floor(this.hints.clientHeight / this.hints.firstChild.offsetHeight) || 1;
    },
  };

  CodeMirror.registerHelper('hint', 'auto', function(cm, options) {
    let helpers = cm.getHelpers(cm.getCursor(), 'hint'),
      words;
    if (helpers.length) {
      for (let i = 0; i < helpers.length; i++) {
        const cur = helpers[i](cm, options);
        if (cur && cur.list.length) return cur;
      }
    } else if (words = cm.getHelper(cm.getCursor(), 'hintWords')) {
      if (words) return CodeMirror.hint.fromList(cm, { words });
    } else if (CodeMirror.hint.anyword) {
      return CodeMirror.hint.anyword(cm, options);
    }
  });

  CodeMirror.registerHelper('hint', 'fromList', function(cm, options) {
    const cur = cm.getCursor(),
      token = cm.getTokenAt(cur);
    const found = [];
    for (let i = 0; i < options.words.length; i++) {
      const word = options.words[i];
      if (word.slice(0, token.string.length) == token.string) { found.push(word); }
    }

    if (found.length) {
      return {
        list: found,
        from: CodeMirror.Pos(cur.line, token.start),
        to: CodeMirror.Pos(cur.line, token.end),
      };
    }
  });

  CodeMirror.commands.autocomplete = CodeMirror.showHint;

  var defaultOptions = {
    hint: CodeMirror.hint.auto,
    completeSingle: true,
    alignWithWord: true,
    closeCharacters: /[\s()\[\]{};:>,]/,
    closeOnUnfocus: true,
    completeOnSingleClick: false,
    container: null,
    customKeys: null,
    extraKeys: null,
  };

  CodeMirror.defineOption('hintOptions', null);
});
