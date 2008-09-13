CmdUtils = {
  commands: [],
  
  CreateCommand: function(cmd) {
    this.commands.push(cmd);
  },
  
  getDocumentInsecure: function() {
    var dummyDocument = document.getElementById('dom');
    dummyDocument.location = {href: 'http://www.foo.com'};
    return dummyDocument;
  },
  
  renderTemplate: function(template, data) {
    return TrimPath.parseTemplate(template).process(data);
  }
};

noun_arb_text = {};

