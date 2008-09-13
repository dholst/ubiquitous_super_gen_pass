var command = null;
var domain = null;
var mods = null;

var commonSetup = function() {
  command = CmdUtils.commands.first();
  domain = {};
  mods = {length: {}};
}

var addPasswordInput = function(id, value) {
  $('dom').insert('<input type="password" id="#{id}" value="#{value}"'.interpolate({id: id || 'id', value: value || ''}));
}