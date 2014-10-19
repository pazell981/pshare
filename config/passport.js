var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../app/models/user');

module.exports = function(passport) {
    passport.serializeUser(function (user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done){
        User.findById (id, function (err, user){
            done (err, user);
        });
    });

    passport.use('local-signup', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, email, password, done) {
        User.findOne({ 'local.email' :  email }, function(err, user) {
            if (err)
                return done(err);
            if (user) {
                return done(null, false, req.flash('regMessage', 'This email is already registered, please log-in.'));
            } else {
                var newUser = new User();
                newUser.local.email    = email;
                newUser.local.password = newUser.generateHash(password);
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });
    }));
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function(req, email, password, done) { 
        User.findOne({ 'local.email' :  email }, function (err, user){
            if (err){
                return done(err);
            }
            if (!user){
                return done(null, false, req.flash('loginMessage', 'User email was not found.'));
            }
            if (!user.validPassword(password)){
                return done(null, false, req.flash('loginMessage', 'The password does not match our records.'));
            }
            return done(null, user);
        });

    }));
}

