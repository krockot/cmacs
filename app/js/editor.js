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
};

function runProgram() {
  var editor = ace.edit("editor");
  var code = editor.getValue();
  var forms = ccc.Parser.parse(ccc.lib.base.keywords + code);
  var environment = new ccc.Environment();
  environment.importLibrary(ccc.lib.base);
  environment.bindGlobal("window", new ccc.NativeObject(window));
  console.clear();
  environment.evalProgram(forms, function(value, isFinal) {
      if (!isFinal)
        return;
      console.log(value.toSource());
    },
    function(error) {
      throw error;
    });
}

initializeEditor();

