/* !
 * Code block dialog plugin for Editor.md
 *
 * @file        code-block-dialog.js
 * @author      pandao
 * @version     1.2.0
 * @updateTime  2015-03-07
 * {@link       https://github.com/pandao/editor.md}
 * @license     MIT
 */

(function() {

  const factory = function(exports) {
    let cmEditor;
    const pluginName = 'code-block-dialog';

    // for CodeBlock dialog select
    const codeLanguages = exports.codeLanguages = {
      asp: [ 'ASP', 'vbscript' ],
      actionscript: [ 'ActionScript(3.0)/Flash/Flex', 'clike' ],
      bash: [ 'Bash/Bat', 'shell' ],
      css: [ 'CSS', 'css' ],
      c: [ 'C', 'clike' ],
      cpp: [ 'C++', 'clike' ],
      csharp: [ 'C#', 'clike' ],
      coffeescript: [ 'CoffeeScript', 'coffeescript' ],
      d: [ 'D', 'd' ],
      dart: [ 'Dart', 'dart' ],
      delphi: [ 'Delphi/Pascal', 'pascal' ],
      erlang: [ 'Erlang', 'erlang' ],
      go: [ 'Golang', 'go' ],
      groovy: [ 'Groovy', 'groovy' ],
      html: [ 'HTML', 'text/html' ],
      java: [ 'Java', 'clike' ],
      json: [ 'JSON', 'text/json' ],
      javascript: [ 'Javascript', 'javascript' ],
      lua: [ 'Lua', 'lua' ],
      less: [ 'LESS', 'css' ],
      markdown: [ 'Markdown', 'gfm' ],
      'objective-c': [ 'Objective-C', 'clike' ],
      php: [ 'PHP', 'php' ],
      perl: [ 'Perl', 'perl' ],
      python: [ 'Python', 'python' ],
      r: [ 'R', 'r' ],
      rst: [ 'reStructedText', 'rst' ],
      ruby: [ 'Ruby', 'ruby' ],
      sql: [ 'SQL', 'sql' ],
      sass: [ 'SASS/SCSS', 'sass' ],
      shell: [ 'Shell', 'shell' ],
      scala: [ 'Scala', 'clike' ],
      swift: [ 'Swift', 'clike' ],
      vb: [ 'VB/VBScript', 'vb' ],
      xml: [ 'XML', 'text/xml' ],
      yaml: [ 'YAML', 'yaml' ],
    };

    exports.fn.codeBlockDialog = function() {

      const _this = this;
      const cm = this.cm;
      const lang = this.lang;
      const editor = this.editor;
      const settings = this.settings;
      const cursor = cm.getCursor();
      const selection = cm.getSelection();
      const classPrefix = this.classPrefix;
      let dialogName = classPrefix + pluginName,
        dialog;
      const dialogLang = lang.dialog.codeBlock;

      cm.focus();

      if (editor.find('.' + dialogName).length > 0) {
        dialog = editor.find('.' + dialogName);
        dialog.find('option:first').attr('selected', 'selected');
        dialog.find('textarea').val(selection);

        this.dialogShowMask(dialog);
        this.dialogLockScreen();
        dialog.show();
      } else {
        const dialogHTML = '<div class="' + classPrefix + 'code-toolbar">' +
                                        dialogLang.selectLabel + '<select><option selected="selected" value="">' + dialogLang.selectDefaultText + '</option></select>' +
                                    '</div>' +
                                    '<textarea placeholder="' + dialogLang.placeholder + '" style="display:none;">' + selection + '</textarea>';

        dialog = this.createDialog({
          name: dialogName,
          title: dialogLang.title,
          width: 780,
          height: 565,
          mask: settings.dialogShowMask,
          drag: settings.dialogDraggable,
          content: dialogHTML,
          lockScreen: settings.dialogLockScreen,
          maskStyle: {
            opacity: settings.dialogMaskOpacity,
            backgroundColor: settings.dialogMaskBgColor,
          },
          buttons: {
            enter: [ lang.buttons.enter, function() {
              const codeTexts = this.find('textarea').val();
              let langName = this.find('select').val();

              if (langName === '') {
                alert(lang.dialog.codeBlock.unselectedLanguageAlert);
                return false;
              }

              if (codeTexts === '') {
                alert(lang.dialog.codeBlock.codeEmptyAlert);
                return false;
              }

              langName = (langName === 'other') ? '' : langName;

              cm.replaceSelection([ '```' + langName, codeTexts, '```' ].join('\n'));

              if (langName === '') {
                cm.setCursor(cursor.line, cursor.ch + 3);
              }

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

      const langSelect = dialog.find('select');

      if (langSelect.find('option').length === 1) {
        for (const key in codeLanguages) {
          const codeLang = codeLanguages[key];
          langSelect.append('<option value="' + key + '" mode="' + codeLang[1] + '">' + codeLang[0] + '</option>');
        }

        langSelect.append('<option value="other">' + dialogLang.otherLanguage + '</option>');
      }

      const mode = langSelect.find('option:selected').attr('mode');

      const cmConfig = {
        mode: (mode) ? mode : 'text/html',
        theme: settings.theme,
        tabSize: 4,
        autofocus: true,
        autoCloseTags: true,
        indentUnit: 4,
        lineNumbers: true,
        lineWrapping: true,
        extraKeys: { 'Ctrl-Q': function(cm) { cm.foldCode(cm.getCursor()); } },
        foldGutter: true,
        gutters: [ 'CodeMirror-linenumbers', 'CodeMirror-foldgutter' ],
        matchBrackets: true,
        indentWithTabs: true,
        styleActiveLine: true,
        styleSelectedText: true,
        autoCloseBrackets: true,
        showTrailingSpace: true,
        highlightSelectionMatches: true,
      };

      const textarea = dialog.find('textarea');
      let cmObj = dialog.find('.CodeMirror');

      if (dialog.find('.CodeMirror').length < 1) {
        cmEditor = exports.$CodeMirror.fromTextArea(textarea[0], cmConfig);
        cmObj = dialog.find('.CodeMirror');

        cmObj.css({
          float: 'none',
          margin: '8px 0',
          border: '1px solid #ddd',
          fontSize: settings.fontSize,
          width: '100%',
          height: '390px',
        });

        cmEditor.on('change', function(cm) {
          textarea.val(cm.getValue());
        });
      } else {

        cmEditor.setValue(cm.getSelection());
      }

      langSelect.change(function() {
        const _mode = $(this).find('option:selected').attr('mode');
        cmEditor.setOption('mode', _mode);
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
