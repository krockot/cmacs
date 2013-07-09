function initializeEditor() {
  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/scheme");
  editor.getSession().setTabSize(2);
  editor.getSession().setUseSoftTabs(true);

  editor.commands.addCommand({
    name: "Insert lambda",
    bindKey: {
      win: "Ctrl-L",
      mac: "Command-L",
    },
    exec: function(editor) {
      editor.insert("\u03bb");
    },
    readOnly: false,
  });

  editor.commands.addCommand({
    name: "Eval",
    bindKey: {
      win: "Ctrl-Enter",
      mac: "Command-Enter",
    },
    exec: function(editor) {
      runProgram();
    },
    readOnly: true,
  });

  // Usurp the console
  var consoleClear = console.clear;
  var consoleLog = console.log;
  var consoleError = console.error;
  var editorConsole = document.querySelector('#console');
  console.clear = function() {
    consoleClear.apply(this, arguments);
    editorConsole.innerText = "";
  };
  var stringifyArgs = function() {
    var text = "";
    for (var i = 0; i < arguments.length; ++i) {
      text += arguments[i].toString() + "\n";
    }
    return text;
  };
  console.log = function() {
    consoleLog.apply(this, arguments);
    var entry = document.createElement("span");
    entry.innerText = stringifyArgs.apply(null, arguments);
    editorConsole.appendChild(entry);
  };
  console.error = function() {
    consoleError.apply(this, arguments);
    var entry = document.createElement("span");
    entry.setAttribute("class", "error");
    entry.innerText = stringifyArgs.apply(null, arguments);
    editorConsole.appendChild(entry);
  };
};

function runProgram() {
  var editor = ace.edit("editor");
  var code = editor.getValue();
  try {
    var forms = ccc.Parser.parse(ccc.lib.base.keywords + code);
    var environment = new ccc.Environment();
    environment.importLibrary(ccc.lib.base);
    environment.bindGlobal("window", new ccc.NativeObject(window));
    console.clear();
    environment.evalProgram(forms, function(value, isFinal) {
      if (!isFinal)
        return;
      console.log(value.toSource())
    }, function(error) {
      throw error;
    });
  } catch(error) {
    console.error(error);
    throw error;
  }
}

initializeEditor();

