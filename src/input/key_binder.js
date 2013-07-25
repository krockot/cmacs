cmacs.input.KeyBinder = function(target) {
  this.bindings_ = {};

  target.addEventListener('keydown', this.onKeyDown_.bind(this), true);
};

cmacs.input.KeyBinder.MOD_SHIFT = 26;
cmacs.input.KeyBinder.KEYCODE_MASK =
    (1 << cmacs.input.KeyBinder.MOD_SHIFT) - 1;

cmacs.input.KeyBinder.modMask = function(ctrl, shift, meta) {
  return +!!ctrl << 2 | +!!shift << 1 | +!!meta;
};

cmacs.input.KeyBinder.modMaskFromEvent = function(e) {
  return cmacs.input.KeyBinder.modMask(e.ctrlKey, e.shiftKey, e.altKey);
};

cmacs.input.KeyBinder.idFromKeyCodeAndModMask = function(keyCode, modMask) {
  return modMask << cmacs.input.KeyBinder.MOD_SHIFT | keyCode;
};

cmacs.input.KeyBinder.idFromEvent = function(e) {
  return cmacs.input.KeyBinder.idFromKeyCodeAndModMask(e.keyCode,
      cmacs.input.KeyBinder.modMaskFromEvent(e));
};

cmacs.input.KeyBinder.modMaskFromId = function(id) {
  return id >> cmacs.input.KeyBinder.MOD_SHIFT;
};

cmacs.input.KeyBinder.keyCodeFromId = function(id) {
  return id & cmacs.input.KeyBinder.KEYCODE_MASK;
};

cmacs.input.KeyBinder.modMaskFromSpecParts = function(parts) {
  var mask = 0;
  var maskMap = {
    'C': cmacs.input.KeyBinder.modMask(true, false, false),
    'S': cmacs.input.KeyBinder.modMask(false, true, false),
    'A': cmacs.input.KeyBinder.modMask(false, false, true),
    'M': cmacs.input.KeyBinder.modMask(false, false, true),
  };
  for (var i = 0; i < parts.length; ++i) {
    if (!maskMap.hasOwnProperty(parts[i]))
      return -1;
    mask |= maskMap[parts[i]];
  }
  return mask;
};

cmacs.input.KeyBinder.keyCodeFromSpecRoot = function(root) {
  if (root.match(/^[a-z]$/))
    return root.charCodeAt(0) - 32;
  var map = {
    'Tab': 9,
    'Backspace': 8,
    'Bksp': 8,
    'Enter': 13,
    'Return': 13,
    'Esc': 27,
  };
  if (map.hasOwnProperty(root))
    return map[root];
  return -1;
};

cmacs.input.KeyBinder.idFromSpec = function(spec) {
  var parts = spec.split('-');
  var root = parts.pop();
  var mask = cmacs.input.KeyBinder.modMaskFromSpecParts(parts);
  var keyCode = cmacs.input.KeyBinder.keyCodeFromSpecRoot(root);
  if (mask === -1 || keyCode === -1) {
    throw new Error("Invalid keybind spec: " + spec);
  }
  return cmacs.input.KeyBinder.idFromKeyCodeAndModMask(keyCode, mask);
};

cmacs.input.KeyBinder.prototype.onKeyDown_ = function(e) {
  var id = cmacs.input.KeyBinder.idFromEvent(e);
  if (!this.bindings_.hasOwnProperty(id))
    return;
  e.preventDefault();
  this.bindings_[id]();
};

cmacs.input.KeyBinder.prototype.bindKey = function(spec, callback) {
  var id = cmacs.input.KeyBinder.idFromSpec(spec);
  this.bindings_[id] = callback;
};
