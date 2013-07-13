cmacs.edit.Editor = function(root) {
  this.editor_ = ace.edit(root);
  this.editor_.setTheme('ace/theme/monokai');
  this.editor_.setFontSize(14);
  this.editor_.getSession().setMode('ace/mode/scheme');
  this.editor_.getSession().setTabSize(2);
  this.editor_.getSession().setUseSoftTabs(true);

  this.editor_.commands.addCommand({
    name: 'Insert lambda',
    bindKey: {
      win: 'Ctrl+L',
      mac: 'Command+L'
    },
    exec: function(editor) {
      editor.insert('\u03bb');
    },
    readOnly: false
  });
};

cmacs.edit.Editor.prototype.getContents = function() {
  return this.editor_.getValue();
};
