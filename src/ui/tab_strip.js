cmacs.ui.TabStrip = function(parent, session, viewContainer) {
  this.document_ = parent.ownerDocument;
  this.element_ = this.document_.createElement('div');
  this.element_.className = 'cmacs_ui_TabStrip';
  parent.appendChild(this.element_);

  this.session_ = session;
  this.viewContainer_ = viewContainer;
  this.tabs_ = [];

  this.session_.onChanged.addListener(this.updateTabs.bind(this));
  this.viewContainer_.onViewChanged.addListener(this.updateTabs.bind(this));

  this.updateTabs();
};

cmacs.ui.TabStrip.prototype.switchToTab = function(index) {
  if (index >= this.tabs_.length)
    throw new Error("Tab index out of bounds");

  var tab = this.tabs_[index];
  var view = tab.view;
  this.tabs_.forEach(function(t) {
    t.classList.remove('active-tab');
  });
  tab.classList.add('active-tab');
  this.viewContainer_.switchToView(view);
};

cmacs.ui.TabStrip.prototype.createTabForView_ = function(view) {
  var tab = {
    view: view,
    element: this.document_.createElement('div'),
    active: false,
  };

  tab.element.className = 'cmacs_ui_Tab';
  tab.element.innerText = view.getBuffer().getName();

  return tab;
};

cmacs.ui.TabStrip.prototype.updateTabs = function() {
  var views = this.session_.getViews();
  this.element_.innerHTML = '';
  this.tabs_ = [];

  views.forEach(function(view) {
    var tab = this.createTabForView_(view);
    this.tabs_.push(tab);
    this.element_.appendChild(tab.element);
    if (this.viewContainer_.getCurrentView() === view) {
      tab.element.classList.add('active');
      tab.active = true;
    }
  }.bind(this));
};

cmacs.ui.TabStrip.prototype.getActiveTabIndex = function() {
  var activeIndex = -1;
  for (var i = 0; activeIndex < 0 && i < this.tabs_.length; ++i) {
    if (this.tabs_[i].active)
      activeIndex = i;
  }
  return activeIndex;
};

cmacs.ui.TabStrip.prototype.switchToNextTab = function() {
  var index = this.getActiveTabIndex();
  if (index < 0)
    return;
  if (index < this.tabs_.length-1) {
    index += 1;
  } else {
    index = 0;
  }
  this.viewContainer_.switchToView(this.tabs_[index].view);
};

cmacs.ui.TabStrip.prototype.switchToPreviousTab = function() {
  var index = this.getActiveTabIndex();
  if (index < 0)
    return;
  if (index > 0) {
    index -= 1;
  } else {
    index = this.tabs_.length - 1;
  }
  this.viewContainer_.switchToView(this.tabs_[index].view);
};
