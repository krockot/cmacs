chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("/html/editor.html",
    { id: "cmacs-editor-1", bounds: { width: 800, height: 600 } },
    function() {
    });
});
