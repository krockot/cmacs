cmacs.ui.TabStrip = function(parent) {
  this.document_ = parent.ownerDocument;
  this.element_ = this.document_.createElement('div');
  this.element_.className = 'cmacs_ui_TabStrip';
  parent.appendChild(this.element_);

  this.tabs_ = [];
};

cmacs.ui.TabStrip.nextTabId_ = 0;

cmacs.ui.TabStrip.prototype.addTab = function(name) {
  var tab = {
    name: name,
    id: cmacs.ui.TabStrip.nexTabId_++,
    element: this.document_.createElement('div'),
  };

  tab.element.className = 'cmacs_ui_Tab';
  this.element_.appendChild(tab.element);

  this.tabs_.push(tab);
  return tab.id;
};

cmacs.ui.TabStrip.prototype.closeTab = function(id) {
  var index = -1;
  for (var i = 0; i < this.tabs_.length; ++i) {
    if (this.tabs_[i].id === id) {
      index = i;
    }
  }
  if (index >= 0)
    this.tabs_.splice(i, 1);
};
