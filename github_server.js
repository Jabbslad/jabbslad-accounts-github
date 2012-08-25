(function () {

  Meteor.accounts.github.setSecret = function (consumerSecret) {
    Meteor.accounts.github._secret = consumerSecret;
  };

  Meteor.accounts.oauth.registerService('github', 2, function(query) {

    var accessToken = getAccessToken(query);
    var identity = getIdentity(accessToken);

    return {
      options: {
        email: identity.email,
        services: {github: {id: identity.id, accessToken: accessToken}}
      },
      extra: {name: identity.name}
    };
  });

  var getAccessToken = function (query) {
    var result = Meteor.http.post(
      "https://github.com/login/oauth/access_token", {headers: {Accept: 'application/json'}, params: {
        code: query.code,
        client_id: Meteor.accounts.github._clientId,
        client_secret: Meteor.accounts.github._secret,
        redirect_uri: Meteor.accounts.github._appUrl + "/_oauth/github?close",
        state: query.state
      }});

    if (result.error) // if the http response was an error
      throw result.error;
    return result.data.access_token;
  };

  var getIdentity = function (accessToken) {
    var result = Meteor.http.get(
      "https://api.github.com/user",
      {params: {access_token: accessToken}});

    if (result.error)
      throw result.error;
    return result.data;
  };
}) ();