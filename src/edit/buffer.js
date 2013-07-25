cmacs.edit.Buffer = function(opt_options) {
  var options = opt_options || {};

  var contents = options.contents || '';

  this.mode_ = options.mode || 'text';
  this.name_ = options.name || 'new';
  this.document_ = new ace.Document(contents);

  this.onChanged = new cmacs.common.Event();
  this.onTitleChanged = new cmacs.common.Event();
};

cmacs.edit.Buffer.prototype.setName = function(name) {
  this.name_ = name;
  this.onTitleChanged.fire();
};

cmacs.edit.Buffer.prototype.getName = function() {
  return this.name_;
};

cmacs.edit.Buffer.prototype.getContents = function() {
  return this.document_.getValue();
};
