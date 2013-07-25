cmacs.ui.ViewContainer = function(parent, session) {
  this.document_ = parent.ownerDocument;
  this.element_ = this.document_.createElement('div');
  this.element_.className = 'cmacs_ui_ContentPanel';
  this.content_ = this.document_.createElement('div');
  this.element_.appendChild(this.content_);
  parent.appendChild(this.element_);

  this.editor_ = ace.edit(this.content_);
  this.editor_.setTheme('ace/theme/monokai');
  this.editor_.setFontSize(14);

  this.editor_.commands.addCommand({
    name: 'Insert lambda',
    bindKey: {
      win: 'Ctrl+L',
      mac: 'Command+L'
    },
    exec: function(editor) {
      this.editor_.insert('\u03bb');
    }.bind(this),
    readOnly: false
  });

  this.currentView_ = null;
  this.onViewChanged = new cmacs.common.Event();
};

cmacs.ui.ViewContainer.prototype.switchToView = function(view) {
  this.editor_.setSession(view.aceSession_);
  this.currentView_ = view;
  this.onViewChanged.fire();
};

cmacs.ui.ViewContainer.prototype.getCurrentView = function() {
  return this.currentView_;
};
