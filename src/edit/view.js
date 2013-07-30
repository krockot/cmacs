cmacs.edit.View = function(buffer) {
  this.buffer_ = buffer;
  this.aceSession_ = ace.createEditSession(this.buffer_.document_);
  this.aceSession_.setTabSize(2);
  this.aceSession_.setUseSoftTabs(true);
  this.aceSession_.setNewLineMode('unix');
  this.lastActive_ = 0;
};

cmacs.edit.View.prototype.getBuffer = function() {
  return this.buffer_;
};

cmacs.edit.View.prototype.setMode = function(mode) {
  this.aceSession_.setMode('ace/mode/' + mode);
};

cmacs.edit.View.prototype.activate = function() {
  this.lastActive_ = Date.now();
};

cmacs.edit.View.prototype.getLastActive = function() {
  return this.lastActive_;
};
