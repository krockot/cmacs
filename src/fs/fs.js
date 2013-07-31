cmacs.fs.init = function(callback) {
  webkitRequestFileSystem(PERSISTENT, 128*1024*1024, function(fs) {
    callback(fs);
  });
};

cmacs.fs.readFileAsString = function(filename, callback) {
  cmacs.fs.init(function(fs) {
    fs.root.getFile(filename, {}, function(entry) {
      entry.file(function(file) {
        var reader = new FileReader();
        reader.onloadend = function() {
          callback(this.result);
        };
        reader.onerror = function() {
          callback(null);
        };
        reader.readAsText(file);
      }, function(error) {
        callback(null)
      });
    }, function(error) {
      callback(null);
    });;
  });
};

cmacs.fs.writeStringToFile = function(filename, contents, callback) {
  cmacs.fs.init(function(fs) {
    fs.root.getFile(filename, { create: true },
      function(entry) {
        entry.createWriter(function(writer) {
          writer.onwriteend = function() {
            writer.onwriteend = function() {
              callback(true);
            };
            var blob = new Blob([contents], { type: 'text/plain' });
            writer.write(blob);
          };
          writer.onerror = function() {
            callback(null);
          };
          writer.truncate(0);
        });
      }, function(error) {
        callback(null);
      });
  });
};
