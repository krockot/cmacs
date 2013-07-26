ace.Document = ace.require('ace/document').Document;

cmacs = {};

window.addEventListener('load', function() {
  var session = new cmacs.edit.Session();
  new cmacs.ui.Frame(window.document.body, session);
});

cmacs.createNewWindow = function() {
  chrome.app.window.create("/html/cmacs.html",
    {
      bounds: {
        left: 0,
        top: 0,
        width: 800,
        height: 600,
      }
    });
};

