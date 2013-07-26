cmacs.ccclib.registerEntries([
  {
    name: 'create-tab',
    impl: function() {
      cmacs.frame.createNewTab();
    },
  },
  {
    name: 'close-tab',
    impl: function() {
      cmacs.frame.closeCurrentTab();
    },
  },
]);
