var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false);
            }
            if (!user.verifyPassword(password)) {
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.use(new GoogleStrategy({
        returnURL: 'http://www.example.com/auth/google/return',
        realm: 'localhost:3000'
    },
    function(identifier, profile, done) {
        User.findOrCreate({
            openId: identifier
        }, function(err, user) {
            done(err, user);
        });
    }
));

passport.use(new FacebookStrategy({
        clientID: 475092382630434,
        clientSecret: process.env.FACEBOOK,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        User.findOrCreate('facebook.id' : profile.id, function(err, user) {
            if (err) {
                return done(err);
            }
            done(null, user);
        });
    }
));

passport.use(new TwitterStrategy({
        consumerKey: kkigdCeqSFJjQZi6mgvJDdVZ3,
        consumerSecret: process.env.TWITTER,
        callbackURL: "http://localhost:3000/auth/twitter/callback"
    },
    function(token, tokenSecret, profile, done) {
        User.findOrCreate({
            twitterId: profile.id
        }, function(err, user) {
            return done(err, user);
        });
    }
));