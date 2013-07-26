cmacs.ccclib.registerEntries([
  {
    name: 'bind-key',
    requiredArgs: ['string', 'procedure'],
    impl: function(spec, callback) {
      cmacs.frame.bindKey(spec.value_,
          ccc.libutil.objectToNativeValue(callback, this.environment));
    },
  },
]);
