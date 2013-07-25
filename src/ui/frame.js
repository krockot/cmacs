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

  window.addEventListener('keypress', function(e) {
    if (e.which === 10 && e.ctrlKey)
      this.evaluateCurrentBuffer();
  }.bind(this));

  this.keyBinder_ = new cmacs.input.KeyBinder(window);

  this.keyBinder_.bindKey('C-Tab',
      this.tabStrip_.switchToNextTab.bind(this.tabStrip_));
  this.keyBinder_.bindKey('C-S-Tab',
      this.tabStrip_.switchToPreviousTab.bind(this.tabStrip_));
  this.keyBinder_.bindKey('C-t', this.createNewTab.bind(this));
  this.keyBinder_.bindKey('C-w', this.closeCurrentTab.bind(this));

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
