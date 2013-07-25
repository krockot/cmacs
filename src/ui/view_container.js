cmacs.ui.ViewContainer = function(parent, session) {
  this.document_ = parent.ownerDocument;
  this.element_ = this.document_.createElement('div');
  this.element_.className = 'cmacs_ui_ViewContainer';
  this.content_ = this.document_.createElement('div');
  this.element_.appendChild(this.content_);
  parent.appendChild(this.element_);

  this.editor_ = ace.edit(this.content_);
  this.editor_.setTheme('ace/theme/monokai');
  this.editor_.setFontSize(14);
  this.editor_.setHighlightActiveLine(false);
  this.editor_.setPrintMarginColumn(0);

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

  this.session_ = session;
  this.session_.onChanged.addListener(this.handleSessionChange_.bind(this));
};

cmacs.ui.ViewContainer.prototype.handleSessionChange_ = function() {
  var views = this.session_.getViews();
  if (views.length > 0) {
    this.content_.style.display = 'block';
  } else {
    this.content_.style.display = 'none';
    this.currentView_ = null;
  }
};

cmacs.ui.ViewContainer.prototype.switchToView = function(view, dontFocus) {
  this.editor_.setSession(view.aceSession_);
  this.currentView_ = view;
  if (!dontFocus) {
    this.editor_.focus();
  }
  this.onViewChanged.fire();
};

cmacs.ui.ViewContainer.prototype.getCurrentView = function() {
  return this.currentView_;
};
