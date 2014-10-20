var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../models/user');

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
        console.log(req);
        process.nextTick(function(){
            User.findOne({ 'local.email' :  email }, function(err, user) {
                if (err)
                    return done(err);
                if (user) {
                    return done(null, false, req.flash('regMessage', 'This email is already registered, please log-in.'));
                } else {
                    var newUser = User.build({
                        email: email,
                        first_name: firstname,
                        last_name: lastname,
                        photo: photo,
                        password: password
                    })
                    newUser.add(
                        function(success){
                            res.json({ message: 'User created!' });
                        },
                        function(err) {
                            res.send(err);
                        });
                }
            });
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

