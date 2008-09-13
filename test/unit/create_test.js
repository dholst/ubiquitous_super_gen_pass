Test.context("Create", {
  setup: commonSetup,
  
  'should create one command': function() {
    CmdUtils.commands.length.shouldEqual(1);
  },
  
  'should be named super-gen-pass': function() {
    command.name.shouldEqual('super-gen-pass');
  }
});

