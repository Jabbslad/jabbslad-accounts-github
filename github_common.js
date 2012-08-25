if (!Meteor.accounts.github) {
  Meteor.accounts.github = {};
  Meteor.accounts.github._requireConfigs = ['_clientId', '_appUrl'];
}

Meteor.accounts.github.config = function(clientId, appUrl, options) {
  Meteor.accounts.github._clientId = clientId;
  Meteor.accounts.github._appUrl = appUrl;
  Meteor.accounts.github._options = options;
};