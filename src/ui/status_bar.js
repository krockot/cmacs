cmacs.ui.StatusBar = function(parent) {
  this.document_ = parent.ownerDocument;
  this.element_ = this.document_.createElement('div');
  this.element_.className = 'cmacs_ui_StatusBar';
  parent.appendChild(this.element_);
};

cmacs.ui.StatusBar.prototype.setStatus = function(statusText) {
  this.element_.innerText = statusText;
};
