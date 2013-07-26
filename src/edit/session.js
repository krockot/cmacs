cmacs.edit.Session = function() {
  this.views_ = [];

  this.onChanged = new cmacs.common.Event();
};

cmacs.edit.Session.prototype.restore = function(config) {
  console.warn('Session restore NYI');
};

cmacs.edit.Session.prototype.getViews = function() {
  return this.views_.slice();
};

cmacs.edit.Session.prototype.addView = function(view) {
  this.views_.push(view);
  this.onChanged.fire();
};

cmacs.edit.Session.prototype.removeView = function(view) {
  var index = this.views_.indexOf(view);
  if (index >= 0) {
    this.views_.splice(index, 1);
    this.onChanged.fire();
  }
};