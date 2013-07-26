cmacs.env.Environment = function() {
  this.cccEnvironment_ = null;
};

cmacs.env.Environment.prototype.initialize = function(opt_callback) {
  var cccEnvironment = new ccc.Environment();
  cccEnvironment.importLibrary(ccc.lib.base);
  cccEnvironment.bindGlobal("window", new ccc.NativeObject(window));

  cccEnvironment.importLibrary(cmacs.ccclib);

  this.cccEnvironment_ = cccEnvironment;
  var libraryForms = ccc.Parser.parse(ccc.lib.base.keywords);
  cccEnvironment.evalProgram(libraryForms, function(value, isFinal) {
    if (isFinal && opt_callback)
      opt_callback(this);
  }.bind(this), function(error) {
    throw error;
  });
};

cmacs.env.createEnvironment = function(callback) {
  var environment = new cmacs.env.Environment();
  environment.initialize(callback);
};

cmacs.env.Environment.prototype.eval = function(code, opt_callback) {
  var forms = ccc.Parser.parse(code);
  this.cccEnvironment_.evalProgram(forms, function(value, isFinal) {
    if (isFinal && opt_callback)
      opt_callback(value);
  }, function(error) {
    throw error;
  });
};
