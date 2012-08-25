(function () {
  Meteor.loginWithGithub = function () {
    if (!Meteor.accounts.github._clientId || !Meteor.accounts.github._appUrl)
      throw new Meteor.accounts.ConfigError("Need to call Meteor.accounts.github.config first");

    var state = Meteor.uuid();

    var required_scope = ['user'];
    var scope = [];
    if (Meteor.accounts.google._options &&
        Meteor.accounts.google._options.scope)
      scope = Meteor.accounts.google._options.scope;
    scope = _.union(scope, required_scope);
    var flat_scope = _.map(scope, encodeURIComponent).join('+');

    var loginUrl =
          'https://github.com/login/oauth/authorize' +
          '?client_id=' + Meteor.accounts.github._clientId +
          '&scope=' + flat_scope +
          '&redirect_uri=' + Meteor.accounts.github._appUrl + '/_oauth/github?close' +
          '&state=' + state;

    Meteor.accounts.oauth.initiateLogin(state, loginUrl);
  };
}) ();
