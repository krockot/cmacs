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
]);
