(function () {
  Meteor.accounts.github.setSecret = function (secret) {
    Meteor.accounts.github._secret = secret;
  };

  Meteor.accounts.oauth.registerService('github', 2, function(query) {

    var accessToken = getAccessToken(query);
    var identity = getIdentity(accessToken);
    
    return {
      options: {
		  services: {
			  github: {
				  id: identity.id, 
				  accessToken: accessToken,
				  email: identity.email
		  }}
      },
      extra: {profile: {name: identity.name}}
    };
  });

  var getAccessToken = function (query) {
	  var config = Meteor.accounts.configuration.findOne({service: 'github'});
	  if (!config)
		  throw new Meteor.accounts.ConfigError("Service not configured");
	  
	  var result = Meteor.http.post(
			  "https://github.com/login/oauth/access_token", {headers: {Accept: 'application/json'}, params: {
				  code: query.code,
				  client_id: config.clientId,
				  client_secret: config.secret,
				  redirect_uri: Meteor.absoluteUrl("_oauth/github?close"),
				  state: query.state
			  }});
	  if (result.error) // if the http response was an error
		  throw result.error;
	  if (result.data.error) // if the http response was a json object with an error attribute
	      throw result.data;
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