const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const config = require('./config.js')

module.exports = () => {
  passport.use(new GitHubStrategy({
    clientID: config.keys.gitHubClientId,
    clientSecret: config.keys.gitHubSecretKey,
    callbackURL: config.keys.gitCallbackUrl,
  }, function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's GitHub profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the GitHub account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
      })
    }
  ))
}
