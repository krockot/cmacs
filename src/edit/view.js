cmacs.edit.View = function(buffer) {
  this.buffer_ = buffer;
  this.aceSession_ = ace.createEditSession(this.buffer_.document_);
  this.aceSession_.setTabSize(2);
  this.aceSession_.setUseSoftTabs(true);
  this.aceSession_.setNewLineMode('unix');
};

cmacs.edit.View.prototype.getBuffer = function() {
  return this.buffer_;
};

cmacs.edit.View.prototype.setMode = function(mode) {
  this.aceSession_.setMode('ace/mode/' + mode);
};
