## jabbslad-accounts-github

**NOTE:** This service is **DEPRECATED** Please refer to [https://github.com/meteor/meteor/tree/devel/packages/accounts-github](https://github.com/meteor/meteor/tree/devel/packages/accounts-github) for the official Meteor accounts-github package.

Github OAuth2 login service for use with Meteor Auth

### Package Dependencies

This login service depends on the bleeding edge changes within the Meteor Auth branch. See [https://github.com/meteor/meteor/wiki/Getting-started-with-Auth](https://github.com/meteor/meteor/wiki/Getting-started-with-Auth) for further details.

* accounts ([Meteor Auth Branch](https://github.com/meteor/meteor/wiki/Getting-started-with-Auth))
* accounts-oauth2-helper ([Meteor Auth Branch](https://github.com/meteor/meteor/wiki/Getting-started-with-Auth))
* http

### Usage

1. `meteor add accounts-github`
2. Read the 'Integrating with Login Services' section of [Getting Started with Auth](https://github.com/meteor/meteor/wiki/Getting-started-with-Auth) and make sure you set up your config and secret correctly.
3. Call `Meteor.loginWithGithub();`

### Credits

* Shamelessly based upon [@possibilities](https://github.com/possibilities) Google OAuth2 login service
* [@bradens](https://github.com/bradens) fixes for latest `auth` branch changes and support for configurable dialog. Thanks man!
