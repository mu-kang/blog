// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports === 'object' && typeof module === 'object') // CommonJS
  { mod(require('../../lib/codemirror')); } else if (typeof define === 'function' && define.amd) // AMD
  { define([ '../../lib/codemirror' ], mod); } else // Plain browser env
  { mod(CodeMirror); }
})(function(CodeMirror) {
  CodeMirror.defineExtension('addPanel', function(node, options) {
    if (!this.state.panels) initPanels(this);

    const info = this.state.panels;
    if (options && options.position == 'bottom') { info.wrapper.appendChild(node); } else { info.wrapper.insertBefore(node, info.wrapper.firstChild); }
    const height = (options && options.height) || node.offsetHeight;
    this._setSize(null, info.heightLeft -= height);
    info.panels++;
    return new Panel(this, node, options, height);
  });

  function Panel(cm, node, options, height) {
    this.cm = cm;
    this.node = node;
    this.options = options;
    this.height = height;
    this.cleared = false;
  }

  Panel.prototype.clear = function() {
    if (this.cleared) return;
    this.cleared = true;
    const info = this.cm.state.panels;
    this.cm._setSize(null, info.heightLeft += this.height);
    info.wrapper.removeChild(this.node);
    if (--info.panels == 0) removePanels(this.cm);
  };

  Panel.prototype.changed = function(height) {
    const newHeight = height == null ? this.node.offsetHeight : height;
    const info = this.cm.state.panels;
    this.cm._setSize(null, info.height += (newHeight - this.height));
    this.height = newHeight;
  };

  function initPanels(cm) {
    const wrap = cm.getWrapperElement();
    const style = window.getComputedStyle ? window.getComputedStyle(wrap) : wrap.currentStyle;
    let height = parseInt(style.height);
    const info = cm.state.panels = {
      setHeight: wrap.style.height,
      heightLeft: height,
      panels: 0,
      wrapper: document.createElement('div'),
    };
    wrap.parentNode.insertBefore(info.wrapper, wrap);
    const hasFocus = cm.hasFocus();
    info.wrapper.appendChild(wrap);
    if (hasFocus) cm.focus();

    cm._setSize = cm.setSize;
    if (height != null) {
      cm.setSize = function(width, newHeight) {
        if (newHeight == null) return this._setSize(width, newHeight);
        info.setHeight = newHeight;
        if (typeof newHeight !== 'number') {
          const px = /^(\d+\.?\d*)px$/.exec(newHeight);
          if (px) {
            newHeight = Number(px[1]);
          } else {
            info.wrapper.style.height = newHeight;
            newHeight = info.wrapper.offsetHeight;
            info.wrapper.style.height = '';
          }
        }
        cm._setSize(width, info.heightLeft += (newHeight - height));
        height = newHeight;
      };
    }
  }

  function removePanels(cm) {
    const info = cm.state.panels;
    cm.state.panels = null;

    const wrap = cm.getWrapperElement();
    info.wrapper.parentNode.replaceChild(wrap, info.wrapper);
    wrap.style.height = info.setHeight;
    cm.setSize = cm._setSize;
    cm.setSize();
  }
});
