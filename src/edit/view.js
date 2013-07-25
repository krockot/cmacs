cmacs.edit.View = function(buffer) {
  this.buffer_ = buffer;
  this.aceSession_ = ace.createEditSession(this.buffer_.document_);
};

cmacs.edit.View.prototype.getBuffer = function() {
  return this.buffer_;
};

