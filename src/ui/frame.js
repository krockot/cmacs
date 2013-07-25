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

  this.viewContainer_.editor_.commands.addCommand({
    name: "Next tab",
    bindKey: { win: "Ctrl+Tab", mac: "Command+Tab" },
    exec: function() {
      this.tabStrip_.switchToNextTab();
    }.bind(this),
    readOnly: true
  });

  this.viewContainer_.editor_.commands.addCommand({
    name: "Previous tab",
    bindKey: { win: "Ctrl+Shift+Tab", mac: "Command+Shift+Tab" },
    exec: function() {
      this.tabStrip_.switchToPreviousTab();
    }.bind(this),
    readOnly: true
  });

  this.viewContainer_.editor_.commands.addCommand({
    name: 'New tab',
    bindKey: {
      win: 'Ctrl+T',
      mac: 'Command+T'
    },
    exec: this.createNewTab.bind(this),
    readOnly: true
  });

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
