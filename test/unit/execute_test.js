Test.context("Execute", {
  setup: function() {
    commonSetup();
    $('dom').update('');
  },

  'should not change anything if no password input fields found': function() {
    command.execute(domain, mods);
    $('dom').innerHTML.shouldEqual('');
  },

  'should not change anything if one empty password input field found': function() {
    addPasswordInput('id1');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('');
  },

  'should not change anything if two password fields found with different values': function() {
    addPasswordInput('id1', 'pass1');
    addPasswordInput('id2', 'pass2');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('pass1');
    $('id2').value.shouldEqual('pass2');
  },

  'should change password with default parameters': function() {
    addPasswordInput('id1', 'password');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('uoHE5TJuvq'); // master: password, domain: foo.com, length: 10
  },

  'should only change password fields with values': function() {
    addPasswordInput('id1', 'password');
    addPasswordInput('id2', '');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('uoHE5TJuvq'); // master: password, domain: foo.com, length: 10
    $('id2').value.shouldEqual('');
  },

  'should change password when domain passed': function() {
    domain.text = 'bar.com';
    addPasswordInput('id1', 'password');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('oGaI9QXZRO'); // master: password, domain: bar.com, length: 10
  },

  'should change password when full domain passed': function() {
    domain.text = 'http://www.bar.com/camp';
    addPasswordInput('id1', 'password');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('oGaI9QXZRO'); // master: password, domain: bar.com, length: 10
  },
  
  'should change password when length passed': function() {
    mods.length.text = '9';
    addPasswordInput('id1', 'password');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('uoHE5TJuv'); // master: password, domain: foo.com, length: 9
  },

  'should change password when domain and length passed': function() {
    domain.text = 'bar.com';
    mods.length.text = '9';
    addPasswordInput('id1', 'password');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('oGaI9QXZR'); // master: password, domain: bar.com, length: 9
  },

  'should change password when length passed is under minimum': function() {
    mods.length.text = '3';
    addPasswordInput('id1', 'password');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('b7kI'); // master: password, domain: foo.com, length: 4
  },

  'should change password when length passed is over maximum': function() {
    mods.length.text = '33';
    addPasswordInput('id1', 'password');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('uoHE5TJuvqyBfpBQoMo4JAAA'); // master: password, domain: foo.com, length: 24
  },

  'should change all passwords with same master password': function() {
    addPasswordInput('id1', 'password');
    addPasswordInput('id2', 'password');
    command.execute(domain, mods);
    $('id1').value.shouldEqual('uoHE5TJuvq'); // master: password, domain: foo.com, length: 10
    $('id2').value.shouldEqual('uoHE5TJuvq'); // master: password, domain: foo.com, length: 10
  }
});