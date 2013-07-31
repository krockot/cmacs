cmacs.edit.Buffer = function(opt_options) {
  var options = opt_options || {};

  var contents = options.contents || '';

  this.mode_ = options.mode || 'text';
  this.name_ = options.name || '#?';

  this.document_ = new ace.Document(contents);

  if (options.filename)
    this.loadFromFile(options.filename);

  this.onChanged = new cmacs.common.Event();
  this.onNameChanged = new cmacs.common.Event();
};

cmacs.edit.Buffer.prototype.setName = function(name) {
  this.name_ = name;
  this.onNameChanged.fire();
};

cmacs.edit.Buffer.prototype.getName = function() {
  return this.name_;
};

cmacs.edit.Buffer.getNameFromFilename = function(filename) {
  return filename;
};

cmacs.edit.Buffer.prototype.getContents = function() {
  return this.document_.getValue();
};

cmacs.edit.Buffer.prototype.insertText = function(position, text) {
  this.document_.insert(position, text);
};

cmacs.edit.Buffer.prototype.loadFromFile = function(filename) {
  this.filename_ = filename;
  this.setName(cmacs.edit.Buffer.getNameFromFilename(filename));
  cmacs.fs.readFileAsString(filename, function(contents) {
    if (!contents)
      this.document_.setValue('');
    this.document_.setValue(contents);
  }.bind(this));
};

cmacs.edit.Buffer.prototype.saveToFile = function(filename) {
  this.filename_ = filename;
  this.setName(cmacs.edit.Buffer.getNameFromFilename(filename));
  this.save();
};

cmacs.edit.Buffer.prototype.save = function() {
  if (!this.filename_)
    return;
  cmacs.fs.writeStringToFile(
      this.filename_,
      this.document_.getValue(),
      function(result) {
        if (!result)
          console.warn('Save failed.');
      });
};
