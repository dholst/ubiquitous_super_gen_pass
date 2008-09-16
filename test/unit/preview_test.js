Test.context("Preview", {
  setup: function() {
    commonSetup();
    $('dom').update('');
    $('preview').update('');
  },
  
  'should show error message when no password inputs on page': function() {
    command.preview($('preview'), domain, mods);
    
    $('preview').innerHTML.shouldEqual(
      '<span style="color: rgb(255, 85, 85); font-family: Helvetica;">A password field was not found on this page or the master password was not entered in it.</span>'
    );
  },
    
  'should show error message with an empty password input': function() {
    addPasswordInput();
    command.preview($('preview'), domain, mods);
    
    $('preview').innerHTML.shouldEqual(
      '<span style="color: rgb(255, 85, 85); font-family: Helvetica;">A password field was not found on this page or the master password was not entered in it.</span>'
    );
  },

  'should show error message with two password input fields with different values': function() {
    addPasswordInput('id1', 'pass1');
    addPasswordInput('id2', 'pass2');
    command.preview($('preview'), domain, mods);
    
   $('preview').innerHTML.shouldEqual(
      '<span style="color: rgb(255, 85, 85); font-family: Helvetica;">Multiple password fields found, but they contain different values. Make sure all passwords to be replaced are the same.</span>'
     );
  },

  'should show preview for one password input field and default parameters': function() {
    addPasswordInput('id1', 'password');
    command.preview($('preview'), domain, mods);

    $('preview').innerHTML.shouldEqual(
      '<span style="color: rgb(255, 255, 85); font-family: Helvetica;">Replace <strong>1</strong> password with a <strong>10</strong> digit SuperGenPass(word) for <strong>foo.com</strong>.</span>'
    );
  },

  'should show preview for two password input fields and default parameters': function() {
    addPasswordInput('id1', 'password');
    addPasswordInput('id2', 'password');
    command.preview($('preview'), domain, mods);
    
    $('preview').innerHTML.shouldEqual(
      '<span style="color: rgb(255, 255, 85); font-family: Helvetica;">Replace <strong>2</strong> passwords with a <strong>10</strong> digit SuperGenPass(word) for <strong>foo.com</strong>.</span>'
    );
  },

  'should show preview with length parameter passed': function() {
    addPasswordInput('id1', 'password');
    mods.length.text = '15'
    command.preview($('preview'), domain, mods);
    
    $('preview').innerHTML.shouldEqual(
      '<span style="color: rgb(255, 255, 85); font-family: Helvetica;">Replace <strong>1</strong> password with a <strong>15</strong> digit SuperGenPass(word) for <strong>foo.com</strong>.</span>'
    );
  },

  'should show preview with domain parameter passed': function() {
    addPasswordInput('id1', 'password');
    domain.text = 'darrinholst.com';
    command.preview($('preview'), domain, mods);
    
    $('preview').innerHTML.shouldEqual(
      '<span style="color: rgb(255, 255, 85); font-family: Helvetica;">Replace <strong>1</strong> password with a <strong>10</strong> digit SuperGenPass(word) for <strong>darrinholst.com</strong>.</span>'
    );
  },
  
  'should show preview with full domain parameter passed': function() {
    addPasswordInput('id1', 'password');
    domain.text = 'http://darrinholst.com/page?foo=bar';
    command.preview($('preview'), domain, mods);
    
    $('preview').innerHTML.shouldEqual(
      '<span style="color: rgb(255, 255, 85); font-family: Helvetica;">Replace <strong>1</strong> password with a <strong>10</strong> digit SuperGenPass(word) for <strong>darrinholst.com</strong>.</span>'
    );
  },
  
  'should ignore hidden password fields': function() {
    addPasswordInput('id1', 'password');
    addPasswordInput('id2', 'foo');
    $('id2').hide();
    command.preview($('preview'), domain, mods);

    $('preview').innerHTML.shouldEqual(
      '<span style="color: rgb(255, 255, 85); font-family: Helvetica;">Replace <strong>1</strong> password with a <strong>10</strong> digit SuperGenPass(word) for <strong>foo.com</strong>.</span>'
    );  
  }
});