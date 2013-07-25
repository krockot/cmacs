ace.Document = ace.require('ace/document').Document;

cmacs = {};

window.addEventListener('load', function() {
  var session = new cmacs.edit.Session();
  new cmacs.ui.Frame(window.document.body, session);
});
