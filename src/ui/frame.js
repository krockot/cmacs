cmacs.ui.Frame = function(parent, opt_options) {
  var options = opt_options || {};

  this.id_ = options.id || cmacs.ui.Frame.nextFrameId_++;
  this.title_ = options.title || "";
  this.document_ = parent.ownerDocument;

  this.element_ = this.document_.createElement('div');
  this.element_.className = 'cmacs_ui_Frame';
  parent.appendChild(this.element_);

  this.tabStrip_ = new cmacs.ui.TabStrip(this.element_);
  this.contentPanel_ = new cmacs.ui.ContentPanel(this.element_);
  this.statusBar_ = new cmacs.ui.StatusBar(this.element_);

  var editorPanel = this.document_.createElement('div');
  this.contentPanel_.setContent(editorPanel);

  this.editor_ = new cmacs.edit.Editor(editorPanel);

  window.addEventListener('keypress', function(e) {
    if (e.which === 10 && e.ctrlKey)
      this.evaluateCurrentBuffer();
  }.bind(this));

  this.environment_ = null;
  cmacs.env.createEnvironment(this.onEnvironmentReady_.bind(this));
};

cmacs.ui.Frame.nextFrameId_ = 0;

cmacs.ui.Frame.prototype.evaluateCurrentBuffer = function() {
  if (!this.environment_)
    return;
  this.environment_.eval(this.editor_.getContents());
};

cmacs.ui.Frame.prototype.onEnvironmentReady_ = function(environment) {
  this.environment_ = environment;
};
