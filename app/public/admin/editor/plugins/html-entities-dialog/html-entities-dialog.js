/* !
 * HTML entities dialog plugin for Editor.md
 *
 * @file        html-entities-dialog.js
 * @author      pandao
 * @version     1.2.0
 * @updateTime  2015-03-08
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

  const factory = function(exports) {

    const $ = jQuery;
    const pluginName = 'html-entities-dialog';
    let selecteds = [];
    let entitiesData = [];

    exports.fn.htmlEntitiesDialog = function() {
      const _this = this;
      const cm = this.cm;
      const lang = _this.lang;
      const settings = _this.settings;
      const path = settings.pluginPath + pluginName + '/';
      const editor = this.editor;
      const cursor = cm.getCursor();
      const selection = cm.getSelection();
      const classPrefix = _this.classPrefix;

      let dialogName = classPrefix + 'dialog-' + pluginName,
        dialog;
      const dialogLang = lang.dialog.htmlEntities;

      const dialogContent = [
        '<div class="' + classPrefix + 'html-entities-box" style=\"width: 760px;height: 334px;margin-bottom: 8px;overflow: hidden;overflow-y: auto;\">',
        '<div class="' + classPrefix + 'grid-table">',
        '</div>',
        '</div>',
      ].join('\r\n');

      cm.focus();

      if (editor.find('.' + dialogName).length > 0) {
        dialog = editor.find('.' + dialogName);

        selecteds = [];
        dialog.find('a').removeClass('selected');

        this.dialogShowMask(dialog);
        this.dialogLockScreen();
        dialog.show();
      } else {
        dialog = this.createDialog({
          name: dialogName,
          title: dialogLang.title,
          width: 800,
          height: 475,
          mask: settings.dialogShowMask,
          drag: settings.dialogDraggable,
          content: dialogContent,
          lockScreen: settings.dialogLockScreen,
          maskStyle: {
            opacity: settings.dialogMaskOpacity,
            backgroundColor: settings.dialogMaskBgColor,
          },
          buttons: {
            enter: [ lang.buttons.enter, function() {
              cm.replaceSelection(selecteds.join(' '));
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

      const table = dialog.find('.' + classPrefix + 'grid-table');

      const drawTable = function() {

        if (entitiesData.length < 1) return;

        const rowNumber = 20;
        const pageTotal = Math.ceil(entitiesData.length / rowNumber);

        table.html('');

        for (let i = 0; i < pageTotal; i++) {
          let row = '<div class="' + classPrefix + 'grid-table-row">';

          for (let x = 0; x < rowNumber; x++) {
            const entity = entitiesData[(i * rowNumber) + x];

            if (typeof entity !== 'undefined') {
              const name = entity.name.replace('&amp;', '&');

              row += '<a href="javascript:;" value="' + entity.name + '" title="' + name + '" class="' + classPrefix + 'html-entity-btn">' + name + '</a>';
            }
          }

          row += '</div>';

          table.append(row);
        }

        dialog.find('.' + classPrefix + 'html-entity-btn').bind(exports.mouseOrTouch('click', 'touchend'), function() {
          $(this).toggleClass('selected');

          if ($(this).hasClass('selected')) {
            selecteds.push($(this).attr('value'));
          }
        });
      };

      if (entitiesData.length < 1) {
        if (typeof (dialog.loading) === 'function') dialog.loading(true);

        $.getJSON(path + pluginName.replace('-dialog', '') + '.json', function(json) {

          if (typeof (dialog.loading) === 'function') dialog.loading(false);

          entitiesData = json;
          drawTable();
        });
      } else {
        drawTable();
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
