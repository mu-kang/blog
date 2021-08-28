/* !
 * Link dialog plugin for Editor.md
 *
 * @file        link-dialog.js
 * @author      pandao
 * @version     1.2.1
 * @updateTime  2015-06-09
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

  const factory = function(exports) {

    const pluginName = 'link-dialog';

    exports.fn.linkDialog = function() {

      const _this = this;
      const cm = this.cm;
      const editor = this.editor;
      const settings = this.settings;
      const selection = cm.getSelection();
      const lang = this.lang;
      const linkLang = lang.dialog.link;
      const classPrefix = this.classPrefix;
      let dialogName = classPrefix + pluginName,
        dialog;

      cm.focus();

      if (editor.find('.' + dialogName).length > 0) {
        dialog = editor.find('.' + dialogName);
        dialog.find('[data-url]').val('http://');
        dialog.find('[data-title]').val(selection);

        this.dialogShowMask(dialog);
        this.dialogLockScreen();
        dialog.show();
      } else {
        const dialogHTML = '<div class="' + classPrefix + 'form">' +
                                        '<label>' + linkLang.url + '</label>' +
                                        '<input type="text" value="http://" data-url />' +
                                        '<br/>' +
                                        '<label>' + linkLang.urlTitle + '</label>' +
                                        '<input type="text" value="' + selection + '" data-title />' +
                                        '<br/>' +
                                    '</div>';

        dialog = this.createDialog({
          title: linkLang.title,
          width: 380,
          height: 211,
          content: dialogHTML,
          mask: settings.dialogShowMask,
          drag: settings.dialogDraggable,
          lockScreen: settings.dialogLockScreen,
          maskStyle: {
            opacity: settings.dialogMaskOpacity,
            backgroundColor: settings.dialogMaskBgColor,
          },
          buttons: {
            enter: [ lang.buttons.enter, function() {
              const url = this.find('[data-url]').val();
              const title = this.find('[data-title]').val();

              if (url === 'http://' || url === '') {
                alert(linkLang.urlEmpty);
                return false;
              }

              /* if (title === "")
                            {
                                alert(linkLang.titleEmpty);
                                return false;
                            }*/

              let str = '[' + title + '](' + url + ' "' + title + '")';

              if (title == '') {
                str = '[' + url + '](' + url + ')';
              }

              cm.replaceSelection(str);

              this.hide().lockScreen(false).hideMask();

              return false;
            } ],

            cancel: [ lang.buttons.cancel, function() {
              this.hide().lockScreen(false).hideMask();

              return false;
            } ],
          },
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
