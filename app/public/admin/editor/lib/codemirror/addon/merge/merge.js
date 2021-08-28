// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

// declare global: diff_match_patch, DIFF_INSERT, DIFF_DELETE, DIFF_EQUAL

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror'), require('diff_match_patch')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror', 'diff_match_patch' ], mod); } else // Plain browser env
  { mod(CodeMirror, diff_match_patch); }
})(function(CodeMirror, diff_match_patch) {
  'use strict';
  const Pos = CodeMirror.Pos;
  const svgNS = 'http://www.w3.org/2000/svg';

  function DiffView(mv, type) {
    this.mv = mv;
    this.type = type;
    this.classes = type == 'left'
      ? { chunk: 'CodeMirror-merge-l-chunk',
        start: 'CodeMirror-merge-l-chunk-start',
        end: 'CodeMirror-merge-l-chunk-end',
        insert: 'CodeMirror-merge-l-inserted',
        del: 'CodeMirror-merge-l-deleted',
        connect: 'CodeMirror-merge-l-connect' }
      : { chunk: 'CodeMirror-merge-r-chunk',
        start: 'CodeMirror-merge-r-chunk-start',
        end: 'CodeMirror-merge-r-chunk-end',
        insert: 'CodeMirror-merge-r-inserted',
        del: 'CodeMirror-merge-r-deleted',
        connect: 'CodeMirror-merge-r-connect' };
  }

  DiffView.prototype = {
    constructor: DiffView,
    init(pane, orig, options) {
      this.edit = this.mv.edit;
      this.orig = CodeMirror(pane, copyObj({ value: orig, readOnly: !this.mv.options.allowEditingOriginals }, copyObj(options)));

      this.diff = getDiff(asString(orig), asString(options.value));
      this.chunks = getChunks(this.diff);
      this.diffOutOfDate = this.dealigned = false;

      this.showDifferences = options.showDifferences !== false;
      this.forceUpdate = registerUpdate(this);
      setScrollLock(this, true, false);
      registerScroll(this);
    },
    setShowDifferences(val) {
      val = val !== false;
      if (val != this.showDifferences) {
        this.showDifferences = val;
        this.forceUpdate('full');
      }
    },
  };

  function ensureDiff(dv) {
    if (dv.diffOutOfDate) {
      dv.diff = getDiff(dv.orig.getValue(), dv.edit.getValue());
      dv.chunks = getChunks(dv.diff);
      dv.diffOutOfDate = false;
      CodeMirror.signal(dv.edit, 'updateDiff', dv.diff);
    }
  }

  let updating = false;
  function registerUpdate(dv) {
    const edit = { from: 0, to: 0, marked: [] };
    const orig = { from: 0, to: 0, marked: [] };
    let debounceChange,
      updatingFast = false;
    function update(mode) {
      updating = true;
      updatingFast = false;
      if (mode == 'full') {
        if (dv.svg) clear(dv.svg);
        if (dv.copyButtons) clear(dv.copyButtons);
        clearMarks(dv.edit, edit.marked, dv.classes);
        clearMarks(dv.orig, orig.marked, dv.classes);
        edit.from = edit.to = orig.from = orig.to = 0;
      }
      ensureDiff(dv);
      if (dv.showDifferences) {
        updateMarks(dv.edit, dv.diff, edit, DIFF_INSERT, dv.classes);
        updateMarks(dv.orig, dv.diff, orig, DIFF_DELETE, dv.classes);
      }
      makeConnections(dv);

      if (dv.mv.options.connect == 'align') { alignChunks(dv); }
      updating = false;
    }
    function setDealign(fast) {
      if (updating) return;
      dv.dealigned = true;
      set(fast);
    }
    function set(fast) {
      if (updating || updatingFast) return;
      clearTimeout(debounceChange);
      if (fast === true) updatingFast = true;
      debounceChange = setTimeout(update, fast === true ? 20 : 250);
    }
    function change(_cm, change) {
      if (!dv.diffOutOfDate) {
        dv.diffOutOfDate = true;
        edit.from = edit.to = orig.from = orig.to = 0;
      }
      // Update faster when a line was added/removed
      setDealign(change.text.length - 1 != change.to.line - change.from.line);
    }
    dv.edit.on('change', change);
    dv.orig.on('change', change);
    dv.edit.on('markerAdded', setDealign);
    dv.edit.on('markerCleared', setDealign);
    dv.orig.on('markerAdded', setDealign);
    dv.orig.on('markerCleared', setDealign);
    dv.edit.on('viewportChange', function() { set(false); });
    dv.orig.on('viewportChange', function() { set(false); });
    update();
    return update;
  }

  function registerScroll(dv) {
    dv.edit.on('scroll', function() {
      syncScroll(dv, DIFF_INSERT) && makeConnections(dv);
    });
    dv.orig.on('scroll', function() {
      syncScroll(dv, DIFF_DELETE) && makeConnections(dv);
    });
  }

  function syncScroll(dv, type) {
    // Change handler will do a refresh after a timeout when diff is out of date
    if (dv.diffOutOfDate) return false;
    if (!dv.lockScroll) return true;
    let editor,
      other,
      now = +new Date();
    if (type == DIFF_INSERT) { editor = dv.edit; other = dv.orig; } else { editor = dv.orig; other = dv.edit; }
    // Don't take action if the position of this editor was recently set
    // (to prevent feedback loops)
    if (editor.state.scrollSetBy == dv && (editor.state.scrollSetAt || 0) + 50 > now) return false;

    const sInfo = editor.getScrollInfo();
    if (dv.mv.options.connect == 'align') {
      targetPos = sInfo.top;
    } else {
      const halfScreen = 0.5 * sInfo.clientHeight,
        midY = sInfo.top + halfScreen;
      const mid = editor.lineAtHeight(midY, 'local');
      const around = chunkBoundariesAround(dv.chunks, mid, type == DIFF_INSERT);
      const off = getOffsets(editor, type == DIFF_INSERT ? around.edit : around.orig);
      const offOther = getOffsets(other, type == DIFF_INSERT ? around.orig : around.edit);
      const ratio = (midY - off.top) / (off.bot - off.top);
      var targetPos = (offOther.top - halfScreen) + ratio * (offOther.bot - offOther.top);

      let botDist,
        mix;
      // Some careful tweaking to make sure no space is left out of view
      // when scrolling to top or bottom.
      if (targetPos > sInfo.top && (mix = sInfo.top / halfScreen) < 1) {
        targetPos = targetPos * mix + sInfo.top * (1 - mix);
      } else if ((botDist = sInfo.height - sInfo.clientHeight - sInfo.top) < halfScreen) {
        const otherInfo = other.getScrollInfo();
        const botDistOther = otherInfo.height - otherInfo.clientHeight - targetPos;
        if (botDistOther > botDist && (mix = botDist / halfScreen) < 1) { targetPos = targetPos * mix + (otherInfo.height - otherInfo.clientHeight - botDist) * (1 - mix); }
      }
    }

    other.scrollTo(sInfo.left, targetPos);
    other.state.scrollSetAt = now;
    other.state.scrollSetBy = dv;
    return true;
  }

  function getOffsets(editor, around) {
    let bot = around.after;
    if (bot == null) bot = editor.lastLine() + 1;
    return { top: editor.heightAtLine(around.before || 0, 'local'),
      bot: editor.heightAtLine(bot, 'local') };
  }

  function setScrollLock(dv, val, action) {
    dv.lockScroll = val;
    if (val && action != false) syncScroll(dv, DIFF_INSERT) && makeConnections(dv);
    dv.lockButton.innerHTML = val ? '\u21db\u21da' : '\u21db&nbsp;&nbsp;\u21da';
  }

  // Updating the marks for editor content

  function clearMarks(editor, arr, classes) {
    for (let i = 0; i < arr.length; ++i) {
      const mark = arr[i];
      if (mark instanceof CodeMirror.TextMarker) {
        mark.clear();
      } else if (mark.parent) {
        editor.removeLineClass(mark, 'background', classes.chunk);
        editor.removeLineClass(mark, 'background', classes.start);
        editor.removeLineClass(mark, 'background', classes.end);
      }
    }
    arr.length = 0;
  }

  // FIXME maybe add a margin around viewport to prevent too many updates
  function updateMarks(editor, diff, state, type, classes) {
    const vp = editor.getViewport();
    editor.operation(function() {
      if (state.from == state.to || vp.from - state.to > 20 || state.from - vp.to > 20) {
        clearMarks(editor, state.marked, classes);
        markChanges(editor, diff, type, state.marked, vp.from, vp.to, classes);
        state.from = vp.from; state.to = vp.to;
      } else {
        if (vp.from < state.from) {
          markChanges(editor, diff, type, state.marked, vp.from, state.from, classes);
          state.from = vp.from;
        }
        if (vp.to > state.to) {
          markChanges(editor, diff, type, state.marked, state.to, vp.to, classes);
          state.to = vp.to;
        }
      }
    });
  }

  function markChanges(editor, diff, type, marks, from, to, classes) {
    let pos = Pos(0, 0);
    const top = Pos(from, 0),
      bot = editor.clipPos(Pos(to - 1));
    const cls = type == DIFF_DELETE ? classes.del : classes.insert;
    function markChunk(start, end) {
      const bfrom = Math.max(from, start),
        bto = Math.min(to, end);
      for (let i = bfrom; i < bto; ++i) {
        const line = editor.addLineClass(i, 'background', classes.chunk);
        if (i == start) editor.addLineClass(line, 'background', classes.start);
        if (i == end - 1) editor.addLineClass(line, 'background', classes.end);
        marks.push(line);
      }
      // When the chunk is empty, make sure a horizontal line shows up
      if (start == end && bfrom == end && bto == end) {
        if (bfrom) { marks.push(editor.addLineClass(bfrom - 1, 'background', classes.end)); } else { marks.push(editor.addLineClass(bfrom, 'background', classes.start)); }
      }
    }

    let chunkStart = 0;
    for (let i = 0; i < diff.length; ++i) {
      const part = diff[i],
        tp = part[0],
        str = part[1];
      if (tp == DIFF_EQUAL) {
        const cleanFrom = pos.line + (startOfLineClean(diff, i) ? 0 : 1);
        moveOver(pos, str);
        const cleanTo = pos.line + (endOfLineClean(diff, i) ? 1 : 0);
        if (cleanTo > cleanFrom) {
          if (i) markChunk(chunkStart, cleanFrom);
          chunkStart = cleanTo;
        }
      } else {
        if (tp == type) {
          const end = moveOver(pos, str, true);
          const a = posMax(top, pos),
            b = posMin(bot, end);
          if (!posEq(a, b)) { marks.push(editor.markText(a, b, { className: cls })); }
          pos = end;
        }
      }
    }
    if (chunkStart <= pos.line) markChunk(chunkStart, pos.line + 1);
  }

  // Updating the gap between editor and original

  function makeConnections(dv) {
    if (!dv.showDifferences) return;

    if (dv.svg) {
      clear(dv.svg);
      var w = dv.gap.offsetWidth;
      attrs(dv.svg, 'width', w, 'height', dv.gap.offsetHeight);
    }
    if (dv.copyButtons) clear(dv.copyButtons);

    const vpEdit = dv.edit.getViewport(),
      vpOrig = dv.orig.getViewport();
    const sTopEdit = dv.edit.getScrollInfo().top,
      sTopOrig = dv.orig.getScrollInfo().top;
    for (let i = 0; i < dv.chunks.length; i++) {
      const ch = dv.chunks[i];
      if (ch.editFrom <= vpEdit.to && ch.editTo >= vpEdit.from &&
          ch.origFrom <= vpOrig.to && ch.origTo >= vpOrig.from) { drawConnectorsForChunk(dv, ch, sTopOrig, sTopEdit, w); }
    }
  }

  function getMatchingOrigLine(editLine, chunks) {
    let editStart = 0,
      origStart = 0;
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      if (chunk.editTo > editLine && chunk.editFrom <= editLine) return null;
      if (chunk.editFrom > editLine) break;
      editStart = chunk.editTo;
      origStart = chunk.origTo;
    }
    return origStart + (editLine - editStart);
  }

  function findAlignedLines(dv, other) {
    const linesToAlign = [];
    for (var i = 0; i < dv.chunks.length; i++) {
      var chunk = dv.chunks[i];
      linesToAlign.push([ chunk.origTo, chunk.editTo, other ? getMatchingOrigLine(chunk.editTo, other.chunks) : null ]);
    }
    if (other) {
      for (var i = 0; i < other.chunks.length; i++) {
        var chunk = other.chunks[i];
        for (var j = 0; j < linesToAlign.length; j++) {
          const align = linesToAlign[j];
          if (align[1] == chunk.editTo) {
            j = -1;
            break;
          } else if (align[1] > chunk.editTo) {
            break;
          }
        }
        if (j > -1) { linesToAlign.splice(j - 1, 0, [ getMatchingOrigLine(chunk.editTo, dv.chunks), chunk.editTo, chunk.origTo ]); }
      }
    }
    return linesToAlign;
  }

  function alignChunks(dv, force) {
    if (!dv.dealigned && !force) return;
    if (!dv.orig.curOp) {
      return dv.orig.operation(function() {
        alignChunks(dv, force);
      });
    }

    dv.dealigned = false;
    const other = dv.mv.left == dv ? dv.mv.right : dv.mv.left;
    if (other) {
      ensureDiff(other);
      other.dealigned = false;
    }
    const linesToAlign = findAlignedLines(dv, other);

    // Clear old aligners
    const aligners = dv.mv.aligners;
    for (var i = 0; i < aligners.length; i++) { aligners[i].clear(); }
    aligners.length = 0;

    const cm = [ dv.orig, dv.edit ],
      scroll = [];
    if (other) cm.push(other.orig);
    for (var i = 0; i < cm.length; i++) { scroll.push(cm[i].getScrollInfo().top); }

    for (let ln = 0; ln < linesToAlign.length; ln++) { alignLines(cm, linesToAlign[ln], aligners); }

    for (var i = 0; i < cm.length; i++) { cm[i].scrollTo(null, scroll[i]); }
  }

  function alignLines(cm, lines, aligners) {
    let maxOffset = 0,
      offset = [];
    for (var i = 0; i < cm.length; i++) {
      if (lines[i] != null) {
        const off = cm[i].heightAtLine(lines[i], 'local');
        offset[i] = off;
        maxOffset = Math.max(maxOffset, off);
      }
    }
    for (var i = 0; i < cm.length; i++) {
      if (lines[i] != null) {
        const diff = maxOffset - offset[i];
        if (diff > 1) { aligners.push(padAbove(cm[i], lines[i], diff)); }
      }
    }
  }

  function padAbove(cm, line, size) {
    let above = true;
    if (line > cm.lastLine()) {
      line--;
      above = false;
    }
    const elt = document.createElement('div');
    elt.className = 'CodeMirror-merge-spacer';
    elt.style.height = size + 'px'; elt.style.minWidth = '1px';
    return cm.addLineWidget(line, elt, { height: size, above });
  }

  function drawConnectorsForChunk(dv, chunk, sTopOrig, sTopEdit, w) {
    const flip = dv.type == 'left';
    const top = dv.orig.heightAtLine(chunk.origFrom, 'local') - sTopOrig;
    if (dv.svg) {
      let topLpx = top;
      let topRpx = dv.edit.heightAtLine(chunk.editFrom, 'local') - sTopEdit;
      if (flip) { var tmp = topLpx; topLpx = topRpx; topRpx = tmp; }
      let botLpx = dv.orig.heightAtLine(chunk.origTo, 'local') - sTopOrig;
      let botRpx = dv.edit.heightAtLine(chunk.editTo, 'local') - sTopEdit;
      if (flip) { var tmp = botLpx; botLpx = botRpx; botRpx = tmp; }
      const curveTop = ' C ' + w / 2 + ' ' + topRpx + ' ' + w / 2 + ' ' + topLpx + ' ' + (w + 2) + ' ' + topLpx;
      const curveBot = ' C ' + w / 2 + ' ' + botLpx + ' ' + w / 2 + ' ' + botRpx + ' -1 ' + botRpx;
      attrs(dv.svg.appendChild(document.createElementNS(svgNS, 'path')),
        'd', 'M -1 ' + topRpx + curveTop + ' L ' + (w + 2) + ' ' + botLpx + curveBot + ' z',
        'class', dv.classes.connect);
    }
    if (dv.copyButtons) {
      const copy = dv.copyButtons.appendChild(elt('div', dv.type == 'left' ? '\u21dd' : '\u21dc',
        'CodeMirror-merge-copy'));
      const editOriginals = dv.mv.options.allowEditingOriginals;
      copy.title = editOriginals ? 'Push to left' : 'Revert chunk';
      copy.chunk = chunk;
      copy.style.top = top + 'px';

      if (editOriginals) {
        const topReverse = dv.orig.heightAtLine(chunk.editFrom, 'local') - sTopEdit;
        const copyReverse = dv.copyButtons.appendChild(elt('div', dv.type == 'right' ? '\u21dd' : '\u21dc',
          'CodeMirror-merge-copy-reverse'));
        copyReverse.title = 'Push to right';
        copyReverse.chunk = { editFrom: chunk.origFrom, editTo: chunk.origTo,
          origFrom: chunk.editFrom, origTo: chunk.editTo };
        copyReverse.style.top = topReverse + 'px';
        dv.type == 'right' ? copyReverse.style.left = '2px' : copyReverse.style.right = '2px';
      }
    }
  }

  function copyChunk(dv, to, from, chunk) {
    if (dv.diffOutOfDate) return;
    to.replaceRange(from.getRange(Pos(chunk.origFrom, 0), Pos(chunk.origTo, 0)),
      Pos(chunk.editFrom, 0), Pos(chunk.editTo, 0));
  }

  // Merge view, containing 0, 1, or 2 diff views.

  var MergeView = CodeMirror.MergeView = function(node, options) {
    if (!(this instanceof MergeView)) return new MergeView(node, options);

    this.options = options;
    const origLeft = options.origLeft,
      origRight = options.origRight == null ? options.orig : options.origRight;

    const hasLeft = origLeft != null,
      hasRight = origRight != null;
    const panes = 1 + (hasLeft ? 1 : 0) + (hasRight ? 1 : 0);
    let wrap = [],
      left = this.left = null,
      right = this.right = null;
    const self = this;

    if (hasLeft) {
      left = this.left = new DiffView(this, 'left');
      var leftPane = elt('div', null, 'CodeMirror-merge-pane');
      wrap.push(leftPane);
      wrap.push(buildGap(left));
    }

    const editPane = elt('div', null, 'CodeMirror-merge-pane');
    wrap.push(editPane);

    if (hasRight) {
      right = this.right = new DiffView(this, 'right');
      wrap.push(buildGap(right));
      var rightPane = elt('div', null, 'CodeMirror-merge-pane');
      wrap.push(rightPane);
    }

    (hasRight ? rightPane : editPane).className += ' CodeMirror-merge-pane-rightmost';

    wrap.push(elt('div', null, null, 'height: 0; clear: both;'));

    const wrapElt = this.wrap = node.appendChild(elt('div', wrap, 'CodeMirror-merge CodeMirror-merge-' + panes + 'pane'));
    this.edit = CodeMirror(editPane, copyObj(options));

    if (left) left.init(leftPane, origLeft, options);
    if (right) right.init(rightPane, origRight, options);

    if (options.collapseIdentical) {
      updating = true;
      this.editor().operation(function() {
        collapseIdenticalStretches(self, options.collapseIdentical);
      });
      updating = false;
    }
    if (options.connect == 'align') {
      this.aligners = [];
      alignChunks(this.left || this.right, true);
    }

    const onResize = function() {
      if (left) makeConnections(left);
      if (right) makeConnections(right);
    };
    CodeMirror.on(window, 'resize', onResize);
    var resizeInterval = setInterval(function() {
      for (var p = wrapElt.parentNode; p && p != document.body; p = p.parentNode) {}
      if (!p) { clearInterval(resizeInterval); CodeMirror.off(window, 'resize', onResize); }
    }, 5000);
  };

  function buildGap(dv) {
    const lock = dv.lockButton = elt('div', null, 'CodeMirror-merge-scrolllock');
    lock.title = 'Toggle locked scrolling';
    const lockWrap = elt('div', [ lock ], 'CodeMirror-merge-scrolllock-wrap');
    CodeMirror.on(lock, 'click', function() { setScrollLock(dv, !dv.lockScroll); });
    const gapElts = [ lockWrap ];
    if (dv.mv.options.revertButtons !== false) {
      dv.copyButtons = elt('div', null, 'CodeMirror-merge-copybuttons-' + dv.type);
      CodeMirror.on(dv.copyButtons, 'click', function(e) {
        const node = e.target || e.srcElement;
        if (!node.chunk) return;
        if (node.className == 'CodeMirror-merge-copy-reverse') {
          copyChunk(dv, dv.orig, dv.edit, node.chunk);
          return;
        }
        copyChunk(dv, dv.edit, dv.orig, node.chunk);
      });
      gapElts.unshift(dv.copyButtons);
    }
    if (dv.mv.options.connect != 'align') {
      let svg = document.createElementNS && document.createElementNS(svgNS, 'svg');
      if (svg && !svg.createSVGRect) svg = null;
      dv.svg = svg;
      if (svg) gapElts.push(svg);
    }

    return dv.gap = elt('div', gapElts, 'CodeMirror-merge-gap');
  }

  MergeView.prototype = {
    constuctor: MergeView,
    editor() { return this.edit; },
    rightOriginal() { return this.right && this.right.orig; },
    leftOriginal() { return this.left && this.left.orig; },
    setShowDifferences(val) {
      if (this.right) this.right.setShowDifferences(val);
      if (this.left) this.left.setShowDifferences(val);
    },
    rightChunks() {
      if (this.right) { ensureDiff(this.right); return this.right.chunks; }
    },
    leftChunks() {
      if (this.left) { ensureDiff(this.left); return this.left.chunks; }
    },
  };

  function asString(obj) {
    if (typeof obj === 'string') return obj;
    return obj.getValue();
  }

  // Operations on diffs

  const dmp = new diff_match_patch();
  function getDiff(a, b) {
    const diff = dmp.diff_main(a, b);
    dmp.diff_cleanupSemantic(diff);
    // The library sometimes leaves in empty parts, which confuse the algorithm
    for (let i = 0; i < diff.length; ++i) {
      const part = diff[i];
      if (!part[1]) {
        diff.splice(i--, 1);
      } else if (i && diff[i - 1][0] == part[0]) {
        diff.splice(i--, 1);
        diff[i][1] += part[1];
      }
    }
    return diff;
  }

  function getChunks(diff) {
    const chunks = [];
    let startEdit = 0,
      startOrig = 0;
    const edit = Pos(0, 0),
      orig = Pos(0, 0);
    for (let i = 0; i < diff.length; ++i) {
      const part = diff[i],
        tp = part[0];
      if (tp == DIFF_EQUAL) {
        const startOff = startOfLineClean(diff, i) ? 0 : 1;
        const cleanFromEdit = edit.line + startOff,
          cleanFromOrig = orig.line + startOff;
        moveOver(edit, part[1], null, orig);
        const endOff = endOfLineClean(diff, i) ? 1 : 0;
        const cleanToEdit = edit.line + endOff,
          cleanToOrig = orig.line + endOff;
        if (cleanToEdit > cleanFromEdit) {
          if (i) {
            chunks.push({ origFrom: startOrig, origTo: cleanFromOrig,
              editFrom: startEdit, editTo: cleanFromEdit });
          }
          startEdit = cleanToEdit; startOrig = cleanToOrig;
        }
      } else {
        moveOver(tp == DIFF_INSERT ? edit : orig, part[1]);
      }
    }
    if (startEdit <= edit.line || startOrig <= orig.line) {
      chunks.push({ origFrom: startOrig, origTo: orig.line + 1,
        editFrom: startEdit, editTo: edit.line + 1 });
    }
    return chunks;
  }

  function endOfLineClean(diff, i) {
    if (i == diff.length - 1) return true;
    let next = diff[i + 1][1];
    if (next.length == 1 || next.charCodeAt(0) != 10) return false;
    if (i == diff.length - 2) return true;
    next = diff[i + 2][1];
    return next.length > 1 && next.charCodeAt(0) == 10;
  }

  function startOfLineClean(diff, i) {
    if (i == 0) return true;
    let last = diff[i - 1][1];
    if (last.charCodeAt(last.length - 1) != 10) return false;
    if (i == 1) return true;
    last = diff[i - 2][1];
    return last.charCodeAt(last.length - 1) == 10;
  }

  function chunkBoundariesAround(chunks, n, nInEdit) {
    let beforeE,
      afterE,
      beforeO,
      afterO;
    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const fromLocal = nInEdit ? chunk.editFrom : chunk.origFrom;
      const toLocal = nInEdit ? chunk.editTo : chunk.origTo;
      if (afterE == null) {
        if (fromLocal > n) { afterE = chunk.editFrom; afterO = chunk.origFrom; } else if (toLocal > n) { afterE = chunk.editTo; afterO = chunk.origTo; }
      }
      if (toLocal <= n) { beforeE = chunk.editTo; beforeO = chunk.origTo; } else if (fromLocal <= n) { beforeE = chunk.editFrom; beforeO = chunk.origFrom; }
    }
    return { edit: { before: beforeE, after: afterE }, orig: { before: beforeO, after: afterO } };
  }

  function collapseSingle(cm, from, to) {
    cm.addLineClass(from, 'wrap', 'CodeMirror-merge-collapsed-line');
    const widget = document.createElement('span');
    widget.className = 'CodeMirror-merge-collapsed-widget';
    widget.title = 'Identical text collapsed. Click to expand.';
    const mark = cm.markText(Pos(from, 0), Pos(to - 1), {
      inclusiveLeft: true,
      inclusiveRight: true,
      replacedWith: widget,
      clearOnEnter: true,
    });
    function clear() {
      mark.clear();
      cm.removeLineClass(from, 'wrap', 'CodeMirror-merge-collapsed-line');
    }
    widget.addEventListener('click', clear);
    return { mark, clear };
  }

  function collapseStretch(size, editors) {
    const marks = [];
    function clear() {
      for (let i = 0; i < marks.length; i++) marks[i].clear();
    }
    for (let i = 0; i < editors.length; i++) {
      const editor = editors[i];
      const mark = collapseSingle(editor.cm, editor.line, editor.line + size);
      marks.push(mark);
      mark.mark.on('clear', clear);
    }
    return marks[0].mark;
  }

  function unclearNearChunks(dv, margin, off, clear) {
    for (let i = 0; i < dv.chunks.length; i++) {
      const chunk = dv.chunks[i];
      for (let l = chunk.editFrom - margin; l < chunk.editTo + margin; l++) {
        const pos = l + off;
        if (pos >= 0 && pos < clear.length) clear[pos] = false;
      }
    }
  }

  function collapseIdenticalStretches(mv, margin) {
    if (typeof margin !== 'number') margin = 2;
    const clear = [],
      edit = mv.editor(),
      off = edit.firstLine();
    for (let l = off, e = edit.lastLine(); l <= e; l++) clear.push(true);
    if (mv.left) unclearNearChunks(mv.left, margin, off, clear);
    if (mv.right) unclearNearChunks(mv.right, margin, off, clear);

    for (let i = 0; i < clear.length; i++) {
      if (clear[i]) {
        const line = i + off;
        for (var size = 1; i < clear.length - 1 && clear[i + 1]; i++, size++) {}
        if (size > margin) {
          const editors = [{ line, cm: edit }];
          if (mv.left) editors.push({ line: getMatchingOrigLine(line, mv.left.chunks), cm: mv.left.orig });
          if (mv.right) editors.push({ line: getMatchingOrigLine(line, mv.right.chunks), cm: mv.right.orig });
          const mark = collapseStretch(size, editors);
          if (mv.options.onCollapse) mv.options.onCollapse(mv, line, size, mark);
        }
      }
    }
  }

  // General utilities

  function elt(tag, content, className, style) {
    const e = document.createElement(tag);
    if (className) e.className = className;
    if (style) e.style.cssText = style;
    if (typeof content === 'string') e.appendChild(document.createTextNode(content));
    else if (content) for (let i = 0; i < content.length; ++i) e.appendChild(content[i]);
    return e;
  }

  function clear(node) {
    for (let count = node.childNodes.length; count > 0; --count) { node.removeChild(node.firstChild); }
  }

  function attrs(elt) {
    for (let i = 1; i < arguments.length; i += 2) { elt.setAttribute(arguments[i], arguments[i + 1]); }
  }

  function copyObj(obj, target) {
    if (!target) target = {};
    for (const prop in obj) if (obj.hasOwnProperty(prop)) target[prop] = obj[prop];
    return target;
  }

  function moveOver(pos, str, copy, other) {
    let out = copy ? Pos(pos.line, pos.ch) : pos,
      at = 0;
    for (;;) {
      const nl = str.indexOf('\n', at);
      if (nl == -1) break;
      ++out.line;
      if (other) ++other.line;
      at = nl + 1;
    }
    out.ch = (at ? 0 : out.ch) + (str.length - at);
    if (other) other.ch = (at ? 0 : other.ch) + (str.length - at);
    return out;
  }

  function posMin(a, b) { return (a.line - b.line || a.ch - b.ch) < 0 ? a : b; }
  function posMax(a, b) { return (a.line - b.line || a.ch - b.ch) > 0 ? a : b; }
  function posEq(a, b) { return a.line == b.line && a.ch == b.ch; }
});
