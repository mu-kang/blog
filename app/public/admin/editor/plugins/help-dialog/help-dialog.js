/* !
 * Help dialog plugin for Editor.md
 *
 * @file        help-dialog.js
 * @author      pandao
 * @version     1.2.0
 * @updateTime  2015-03-08
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

  const factory = function(exports) {

    const $ = jQuery;
    const pluginName = 'help-dialog';

    exports.fn.helpDialog = function() {
      const _this = this;
      const lang = this.lang;
      const editor = this.editor;
      const settings = this.settings;
      const path = settings.pluginPath + pluginName + '/';
      const classPrefix = this.classPrefix;
      let dialogName = classPrefix + pluginName,
        dialog;
      const dialogLang = lang.dialog.help;

      if (editor.find('.' + dialogName).length < 1) {
        const dialogContent = '<div class="markdown-body" style="font-family:微软雅黑, Helvetica, Tahoma, STXihei,Arial;height:390px;overflow:auto;font-size:14px;border-bottom:1px solid #ddd;padding:0 20px 20px 0;"></div>';

        dialog = this.createDialog({
          name: dialogName,
          title: dialogLang.title,
          width: 840,
          height: 540,
          mask: settings.dialogShowMask,
          drag: settings.dialogDraggable,
          content: dialogContent,
          lockScreen: settings.dialogLockScreen,
          maskStyle: {
            opacity: settings.dialogMaskOpacity,
            backgroundColor: settings.dialogMaskBgColor,
          },
          buttons: {
            close: [ lang.buttons.close, function() {
              this.hide().lockScreen(false).hideMask();

              return false;
            } ],
          },
        });
      }

      dialog = editor.find('.' + dialogName);

      this.dialogShowMask(dialog);
      this.dialogLockScreen();
      dialog.show();

      const helpContent = dialog.find('.markdown-body');

      if (helpContent.html() === '') {
        $.get(path + 'help.md', function(text) {
          const md = exports.$marked(text);
          helpContent.html(md);

          helpContent.find('a').attr('target', '_blank');
        });
      }
    };

  };

  // CommonJS/Node.js
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    module.exports = factory;
  } else if (typeof define === 'function') // AMD/CMD/Sea.js
  {
    if (define.amd) { // for Require.js

      define([ 'editormd' ], function(editormd) {
        factory(editormd);
      });

    } else { // for Sea.js
      define(function(require) {
        const editormd = require('./../../editormd');
        factory(editormd);
      });
    }
  } else {
    factory(window.editormd);
  }

})();
