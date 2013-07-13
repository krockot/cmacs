cmacs.common.Event = function() {
  this.listeners_ = [];
};

cmacs.common.Event.prototype.addListener = function(listener) {
  if (this.listeners_.indexOf(listener) === -1)
    this.listeners_.push(listener);
};

cmacs.common.Event.prototype.removeListener = function(listener) {
  var index = this.listeners_.indexOf(listener);
  if (index >= 0)
    this.listeners_.splice(index, 1);
};

cmacs.common.Event.prototype.fire = function(object) {
  this.listeners_.forEach(function(listener) {
    listener(object);
  });
};
