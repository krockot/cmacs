chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create("/html/cmacs.html",
      {
        bounds: {
          left: 0,
          top: 0,
          width: 800,
          height: 600,
        }
      });
});
