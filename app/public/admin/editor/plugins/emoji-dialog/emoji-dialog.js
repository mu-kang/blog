/* !
 * Emoji dialog plugin for Editor.md
 *
 * @file        emoji-dialog.js
 * @author      pandao
 * @version     1.2.0
 * @updateTime  2015-03-08
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

  const factory = function(exports) {

    const $ = jQuery;
    const pluginName = 'emoji-dialog';
    let emojiTabIndex = 0;
    let emojiData = [];
    let selecteds = [];

    const logoPrefix = 'editormd-logo';
    const logos = [
      logoPrefix,
      logoPrefix + '-1x',
      logoPrefix + '-2x',
      logoPrefix + '-3x',
      logoPrefix + '-4x',
      logoPrefix + '-5x',
      logoPrefix + '-6x',
      logoPrefix + '-7x',
      logoPrefix + '-8x',
    ];

    const langs = {
      'zh-cn': {
        toolbar: {
          emoji: 'Emoji 表情',
        },
        dialog: {
          emoji: {
            title: 'Emoji 表情',
          },
        },
      },
      'zh-tw': {
        toolbar: {
          emoji: 'Emoji 表情',
        },
        dialog: {
          emoji: {
            title: 'Emoji 表情',
          },
        },
      },
      en: {
        toolbar: {
          emoji: 'Emoji',
        },
        dialog: {
          emoji: {
            title: 'Emoji',
          },
        },
      },
    };

    exports.fn.emojiDialog = function() {
      const _this = this;
      const cm = this.cm;
      const settings = _this.settings;

      if (!settings.emoji) {
        alert('settings.emoji == false');
        return;
      }

      const path = settings.pluginPath + pluginName + '/';
      const editor = this.editor;
      const cursor = cm.getCursor();
      const selection = cm.getSelection();
      const classPrefix = this.classPrefix;

      $.extend(true, this.lang, langs[this.lang.name]);
      this.setToolbar();

      const lang = this.lang;
      let dialogName = classPrefix + pluginName,
        dialog;
      const dialogLang = lang.dialog.emoji;

      const dialogContent = [
        '<div class="' + classPrefix + 'emoji-dialog-box" style="width: 760px;height: 334px;margin-bottom: 8px;overflow: hidden;">',
        '<div class="' + classPrefix + 'tab"></div>',
        '</div>',
      ].join('\n');

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

      const category = [ 'Github emoji', 'Twemoji', 'Font awesome', 'Editor.md logo' ];
      const tab = dialog.find('.' + classPrefix + 'tab');

      if (tab.html() === '') {
        let head = '<ul class="' + classPrefix + 'tab-head">';

        for (let i = 0; i < 4; i++) {
          const active = (i === 0) ? ' class="active"' : '';
          head += '<li' + active + '><a href="javascript:;">' + category[i] + '</a></li>';
        }

        head += '</ul>';

        tab.append(head);

        let container = '<div class="' + classPrefix + 'tab-container">';

        for (let x = 0; x < 4; x++) {
          const display = (x === 0) ? '' : 'display:none;';
          container += '<div class="' + classPrefix + 'tab-box" style="height: 260px;overflow: hidden;overflow-y: auto;' + display + '"></div>';
        }

        container += '</div>';

        tab.append(container);
      }

      const tabBoxs = tab.find('.' + classPrefix + 'tab-box');
      const emojiCategories = [ 'github-emoji', 'twemoji', 'font-awesome', logoPrefix ];

      const drawTable = function() {
        const cname = emojiCategories[emojiTabIndex];
        const $data = emojiData[cname];
        const $tab = tabBoxs.eq(emojiTabIndex);

        if ($tab.html() !== '') {
          // console.log("break =>", cname);
          return;
        }

        const pagination = function(data, type) {
          const rowNumber = (type === 'editormd-logo') ? '5' : 20;
          const pageTotal = Math.ceil(data.length / rowNumber);
          let table = '<div class="' + classPrefix + 'grid-table">';

          for (let i = 0; i < pageTotal; i++) {
            let row = '<div class="' + classPrefix + 'grid-table-row">';

            for (let x = 0; x < rowNumber; x++) {
              const emoji = $.trim(data[(i * rowNumber) + x]);

              if (typeof emoji !== 'undefined' && emoji !== '') {
                let img = '',
                  icon = '';

                if (type === 'github-emoji') {
                  let src = (emoji === '+1') ? 'plus1' : emoji;
                  src = (src === 'black_large_square') ? 'black_square' : src;
                  src = (src === 'moon') ? 'waxing_gibbous_moon' : src;

                  src = exports.emoji.path + src + exports.emoji.ext;
                  img = '<img src="' + src + '" width="24" class="emoji" title="&#58;' + emoji + '&#58;" alt="&#58;' + emoji + '&#58;" />';
                  row += '<a href="javascript:;" value=":' + emoji + ':" title=":' + emoji + ':" class="' + classPrefix + 'emoji-btn">' + img + '</a>';
                } else if (type === 'twemoji') {
                  const twemojiSrc = exports.twemoji.path + emoji + exports.twemoji.ext;
                  img = '<img src="' + twemojiSrc + '" width="24" title="twemoji-' + emoji + '" alt="twemoji-' + emoji + '" class="emoji twemoji" />';
                  row += '<a href="javascript:;" value=":tw-' + emoji + ':" title=":tw-' + emoji + ':" class="' + classPrefix + 'emoji-btn">' + img + '</a>';
                } else if (type === 'font-awesome') {
                  icon = '<i class="fa fa-' + emoji + ' fa-emoji" title="' + emoji + '"></i>';
                  row += '<a href="javascript:;" value=":fa-' + emoji + ':" title=":fa-' + emoji + ':" class="' + classPrefix + 'emoji-btn">' + icon + '</a>';
                } else if (type === 'editormd-logo') {
                  icon = '<i class="' + emoji + '" title="Editor.md logo (' + emoji + ')"></i>';
                  row += '<a href="javascript:;" value=":' + emoji + ':" title=":' + emoji + ':" style="width:20%;" class="' + classPrefix + 'emoji-btn">' + icon + '</a>';
                }
              } else {
                row += '<a href="javascript:;" value=""></a>';
              }
            }

            row += '</div>';

            table += row;
          }

          table += '</div>';

          return table;
        };

        if (emojiTabIndex === 0) {
          for (let i = 0, len = $data.length; i < len; i++) {
            const h4Style = (i === 0) ? ' style="margin: 0 0 10px;"' : ' style="margin: 10px 0;"';
            $tab.append('<h4' + h4Style + '>' + $data[i].category + '</h4>');
            $tab.append(pagination($data[i].list, cname));
          }
        } else {
          $tab.append(pagination($data, cname));
        }

        $tab.find('.' + classPrefix + 'emoji-btn').bind(exports.mouseOrTouch('click', 'touchend'), function() {
          $(this).toggleClass('selected');

          if ($(this).hasClass('selected')) {
            selecteds.push($(this).attr('value'));
          }
        });
      };

      if (emojiData.length < 1) {
        if (typeof dialog.loading === 'function') {
          dialog.loading(true);
        }

        $.getJSON(path + 'emoji.json?temp=' + Math.random(), function(json) {

          if (typeof dialog.loading === 'function') {
            dialog.loading(false);
          }

          emojiData = json;
          emojiData[logoPrefix] = logos;
          drawTable();
        });
      } else {
        drawTable();
      }

      tab.find('li').bind(exports.mouseOrTouch('click', 'touchend'), function() {
        const $this = $(this);
        emojiTabIndex = $this.index();

        $this.addClass('active').siblings().removeClass('active');
        tabBoxs.eq(emojiTabIndex).show().siblings()
          .hide();
        drawTable();
      });
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
