cmacs.ccclib.registerEntries([
  {
    name: 'insert-text',
    requiredArgs: ['String'],
    impl: function(text) {
      cmacs.frame.insertText(text.value_);
    },
  },
]);
