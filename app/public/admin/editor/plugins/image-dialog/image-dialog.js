/* !
 * Image (upload) dialog plugin for Editor.md
 *
 * @file        image-dialog.js
 * @author      pandao
 * @version     1.3.4
 * @updateTime  2015-06-09
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

  const factory = function(exports) {

    const pluginName = 'image-dialog';

    exports.fn.imageDialog = function() {

      const _this = this;
      const cm = this.cm;
      const lang = this.lang;
      const editor = this.editor;
      const settings = this.settings;
      const cursor = cm.getCursor();
      const selection = cm.getSelection();
      const imageLang = lang.dialog.image;
      const classPrefix = this.classPrefix;
      const iframeName = classPrefix + 'image-iframe';
      let dialogName = classPrefix + pluginName,
        dialog;

      cm.focus();

      const loading = function(show) {
        const _loading = dialog.find('.' + classPrefix + 'dialog-mask');
        _loading[(show) ? 'show' : 'hide']();
      };

      if (editor.find('.' + dialogName).length < 1) {
        const guid = (new Date()).getTime();
        let action = settings.imageUploadURL + (settings.imageUploadURL.indexOf('?') >= 0 ? '&' : '?') + 'guid=' + guid;

        if (settings.crossDomainUpload) {
          action += '&callback=' + settings.uploadCallbackURL + '&dialog_id=editormd-image-dialog-' + guid;
        }

        const dialogContent = ((settings.imageUpload) ? '<form action="' + action + '" target="' + iframeName + '" method="post" enctype="multipart/form-data" class="' + classPrefix + 'form">' : '<div class="' + classPrefix + 'form">') +
                                        ((settings.imageUpload) ? '<iframe name="' + iframeName + '" id="' + iframeName + '" guid="' + guid + '"></iframe>' : '') +
                                        '<label>' + imageLang.url + '</label>' +
                                        '<input type="text" data-url />' + (function() {
          return (settings.imageUpload) ? '<div class="' + classPrefix + 'file-input">' +
                                                                                '<input type="file" name="' + classPrefix + 'image-file" accept="image/*" />' +
                                                                                '<input type="submit" value="' + imageLang.uploadButton + '" />' +
                                                                            '</div>' : '';
        })() +
                                        '<br/>' +
                                        '<label>' + imageLang.alt + '</label>' +
                                        '<input type="text" value="' + selection + '" data-alt />' +
                                        '<br/>' +
                                        '<label>' + imageLang.link + '</label>' +
                                        '<input type="text" value="http://" data-link />' +
                                        '<br/>' +
                                    ((settings.imageUpload) ? '</form>' : '</div>');

        // var imageFooterHTML = "<button class=\"" + classPrefix + "btn " + classPrefix + "image-manager-btn\" style=\"float:left;\">" + imageLang.managerButton + "</button>";

        dialog = this.createDialog({
          title: imageLang.title,
          width: (settings.imageUpload) ? 465 : 380,
          height: 254,
          name: dialogName,
          content: dialogContent,
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
              const alt = this.find('[data-alt]').val();
              const link = this.find('[data-link]').val();

              if (url === '') {
                alert(imageLang.imageURLEmpty);
                return false;
              }

              const altAttr = (alt !== '') ? ' "' + alt + '"' : '';

              if (link === '' || link === 'http://') {
                cm.replaceSelection('![' + alt + '](' + url + altAttr + ')');
              } else {
                cm.replaceSelection('[![' + alt + '](' + url + altAttr + ')](' + link + altAttr + ')');
              }

              if (alt === '') {
                cm.setCursor(cursor.line, cursor.ch + 2);
              }

              this.hide().lockScreen(false).hideMask();

              // 删除对话框
              this.remove();

              return false;
            } ],

            cancel: [ lang.buttons.cancel, function() {
              this.hide().lockScreen(false).hideMask();

              // 删除对话框
              this.remove();

              return false;
            } ],
          },
        });

        dialog.attr('id', classPrefix + 'image-dialog-' + guid);

        if (!settings.imageUpload) {
          return;
        }

        const fileInput = dialog.find('[name="' + classPrefix + 'image-file"]');

        fileInput.bind('change', function() {
          const fileName = fileInput.val();
          const isImage = new RegExp('(\\.(' + settings.imageFormats.join('|') + '))$', 'i'); // /(\.(webp|jpg|jpeg|gif|bmp|png))$/

          if (fileName === '') {
            alert(imageLang.uploadFileEmpty);

            return false;
          }

          if (!isImage.test(fileName)) {
            alert(imageLang.formatNotAllowed + settings.imageFormats.join(', '));

            return false;
          }

          loading(true);

          const submitHandler = function() {

            const uploadIframe = document.getElementById(iframeName);

            uploadIframe.onload = function() {

              loading(false);

              const body = (uploadIframe.contentWindow ? uploadIframe.contentWindow : uploadIframe.contentDocument).document.body;
              let json = (body.innerText) ? body.innerText : ((body.textContent) ? body.textContent : null);

              json = (typeof JSON.parse !== 'undefined') ? JSON.parse(json) : eval('(' + json + ')');

              if (!settings.crossDomainUpload) {
                if (json.success === 1) {
                  dialog.find('[data-url]').val(json.url);
                } else {
                  alert(json.message);
                }
              }

              return false;
            };
          };

          dialog.find('[type="submit"]').bind('click', submitHandler).trigger('click');
        });
      }

      dialog = editor.find('.' + dialogName);
      dialog.find('[type="text"]').val('');
      dialog.find('[type="file"]').val('');
      dialog.find('[data-link]').val('http://');

      this.dialogShowMask(dialog);
      this.dialogLockScreen();
      dialog.show();

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
