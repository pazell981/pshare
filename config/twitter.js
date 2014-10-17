var passport = require('passport');
passport.use(new TwitterStrategy({
    consumerKey: kkigdCeqSFJjQZi6mgvJDdVZ3 ,
    consumerSecret: 3ucCR1zPV64sL4un912NMLAfOl1Ws5BZnHZbJY37RG6vM9UeFz,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    User.findOrCreate({ twitterId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));