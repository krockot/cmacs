cmacs.ui.Frame = function(parent, session, opt_options) {
  var options = opt_options || {};

  this.session_ = session;
  this.id_ = options.id || cmacs.ui.Frame.nextFrameId_++;
  this.title_ = options.title || "";
  this.document_ = parent.ownerDocument;

  this.element_ = this.document_.createElement('div');
  this.element_.className = 'cmacs_ui_Frame';
  parent.appendChild(this.element_);

  this.viewContainer_ = new cmacs.ui.ViewContainer(this.element_, session);
  this.tabStrip_ = new cmacs.ui.TabStrip(this.element_, session,
      this.viewContainer_);
  this.statusBar_ = new cmacs.ui.StatusBar(this.element_, session);

  this.keyBinder_ = new cmacs.input.KeyBinder(window);

  this.keyBinder_.bindKey('C-Tab',
      this.tabStrip_.switchToNextTab.bind(this.tabStrip_));
  this.keyBinder_.bindKey('C-S-Tab',
      this.tabStrip_.switchToPreviousTab.bind(this.tabStrip_));
  this.keyBinder_.bindKey('C-t', this.createNewTab.bind(this));
  this.keyBinder_.bindKey('C-w', this.closeCurrentTab.bind(this));
  this.keyBinder_.bindKey('C-n', cmacs.createNewWindow);
  this.keyBinder_.bindKey('C-e', this.evaluateCurrentBuffer.bind(this));

  this.environment_ = null;
  cmacs.env.createEnvironment(this.onEnvironmentReady_.bind(this));

  chrome.storage.sync.get('lastSession', function(result) {
    if (result.lastSession)
      this.session_.restore(result.lastSession);
  }.bind(this));

  this.createNewTab();
};

cmacs.ui.Frame.nextFrameId_ = 0;

cmacs.ui.Frame.prototype.evaluateCurrentBuffer = function() {
  if (!this.environment_)
    return;
  this.environment_.eval(this.viewContainer_.getCurrentView().
      getBuffer().getContents());
};

cmacs.ui.Frame.prototype.onEnvironmentReady_ = function(environment) {
  this.environment_ = environment;
};

cmacs.ui.Frame.prototype.createNewTab = function() {
  var view = new cmacs.edit.View(new cmacs.edit.Buffer());
  this.session_.addView(view);
  this.viewContainer_.switchToView(view);
};

cmacs.ui.Frame.prototype.closeCurrentTab = function() {
  var view = this.viewContainer_.getCurrentView();
  if (view === null)
    chrome.app.window.current().close();
  this.tabStrip_.switchToNextTab();
  this.session_.removeView(view);
};

cmacs.ui.Frame.prototype.bindKey = function(spec, callback) {
  this.keyBinder_.bindKey(spec, callback);
};

cmacs.ui.Frame.prototype.getCurrentView = function() {
  return this.viewContainer_.getCurrentView();
}

cmacs.ui.Frame.prototype.getCurrentBuffer = function() {
  var view = this.getCurrentView();
  if (!view)
    return null;
  return view.getBuffer();
};

cmacs.ui.Frame.prototype.insertText = function(text) {
  var buffer = this.getCurrentBuffer();
  if (buffer === null)
    return;
  buffer.insertText(this.viewContainer_.getCursorPosition(), text);
};
