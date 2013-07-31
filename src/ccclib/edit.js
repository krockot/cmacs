cmacs.ccclib.registerEntries([
  {
    name: 'insert-text',
    requiredArgs: ['String'],
    impl: function(text) {
      cmacs.frame.insertText(text.value_);
    },
  },
  {
    name: 'set-buffer-mode',
    requiredArgs: ['String'],
    impl: function(mode) {
      var view = cmacs.frame.getCurrentView();
      view.setMode(mode.value_);
    },
  },
  {
    name: 'load-from-file',
    requiredArgs: ['String'],
    impl: function(filename) {
      var buffer = cmacs.frame.getCurrentBuffer();
      if (buffer)
        buffer.loadFromFile(filename.value_);
    },
  },
  {
    name: 'save-to-file',
    optionalArgs: ['String'],
    impl: function(opt_filename) {
      var buffer = cmacs.frame.getCurrentBuffer();
      if (!buffer)
        return;
      if (opt_filename === ccc.unspecified)
        buffer.save();
      buffer.saveToFile(opt_filename.value_);
    },
  },
]);
