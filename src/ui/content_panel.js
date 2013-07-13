cmacs.ui.ContentPanel = function(parent) {
  this.document_ = parent.ownerDocument;
  this.element_ = this.document_.createElement('div');
  this.element_.className = 'cmacs_ui_ContentPanel';
  parent.appendChild(this.element_);
};

cmacs.ui.ContentPanel.prototype.setContent = function(element) {
  this.element_.innerHTML = '';
  this.element_.appendChild(element);
};
