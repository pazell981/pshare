var db = require('../config/mysql.js').db;
var bcrypt = require('bcryptjs');

var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

configAuth = require('./auth')

module.exports = function(passport) {
    passport.serializeUser(function (user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done){
        db.query("select * from users where id = "+id,function(err,rows){   
            done(err, rows[0]);
        });
    });
    passport.use('local-login', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true 
    },
    function (req, email, password, done){ 
         db.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){
            if (err){
                return done(err);                
            }
            if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'User was not found.'));
            } 
            if (!bcrypt.compareSync(password, rows[0].password)){
                return done(null, false, req.flash('loginMessage', 'Oops! The password does not match the one on file.'));
            }
            return done(null, rows[0]);         
        });
    }));
    passport.use(new FacebookStrategy({
            clientID: configAuth.facebookAuth.clientID,
            clientSecret: configAuth.facebookAuth.clientSecret,
            callbackURL: configAuth.facebookAuth.callbackURL
        },
        function (token, refreshToken, profile, done){
            process.nextTick(function(){
                db.query("SELECT * FROM `facebook_logins` WHERE `id` = '" + profile.id + "'", function (err, user){
                    if (err){
                        return done(err);
                    }
                    if (user){
                        return done(null, user);
                    }
                    db.query("SELECT * FROM `users` WHERE `email` = '" + emails[0].value + "'", function (err, row){
                        if (row){
                            var facebook = new Object({
                                id: profile.id,
                                token: token,
                                user_id: row.id
                            });
                            db.query("INSERT INTO facebook_logins (id, token, user_id) VALUES ('"+facebook.id+"', "+facebook.token+"', "+facebook.user_id+"')");
                        } else {
                            var newUser = new Object({
                                email: profile.emails[0].value,
                                first_name: profile.name.givenName,
                                last_name: profile.name.familyName,
                                photo: profile.photos.value
                            });
                            db.query("INSERT INTO users (first_name, last_name, email, photo, password) VALUES ('"+newUser.first_name+"', '"+newUser.last_name+"', '"+newUser.email+"', '"+newUser.photo+"')");
                            db.query("SELECT * FROM `users` WHERE `email` = '" + newUser.email + "'", function (err, row){
                                var newFacebook = new Object({
                                    id: profile.id,
                                    token: token,
                                    user_id: row.id
                                })
                                db.query("INSERT INTO facebook_logins (id, token, user_id) VALUES ('"+newFacebook.id+"', "+newFacebook.token+"', "+newFacebook.user_id+"')");
                            })
                        }
                    })
                })
            })
        }
    ))
    passport.use(new TwitterStrategy({
            consumerKey     : configAuth.twitterAuth.consumerKey,
            consumerSecret  : configAuth.twitterAuth.consumerSecret,
            callbackURL     : configAuth.twitterAuth.callbackURL
        },
        function (token, tokenSecret, profile, done){
            process.nextTick(function(){
                db.query("SELECT * FROM `twitter_logins` WHERE `id` = '" + profile.id + "'", function (err, user){
                    if (err){
                        return done(err);
                    }
                    if (user){
                        return done(null, user);
                    }
                    db.query("SELECT * FROM `users` WHERE `email` = '" + emails[0].value + "'", function (err, row){
                        if (row){
                            var twitter = new Object({
                                id: profile.id,
                                token: token,
                                displayName: profile.displayName,
                                username: profile. username,
                                user_id: row.id
                            });
                            db.query("INSERT INTO twitter_logins (id, token, displayName, username, user_id) VALUES ('"+twitter.id+"', "+twitter.token+"', "+twitter.displayName+", "+twitter.username+", "+twitter.user_id+"')");
                        } else {
                            var newUser = new Object({
                                email: profile.emails[0].value,
                                first_name: profile.name.givenName,
                                last_name: profile.name.familyName,
                                photo: profile.photos.value
                            });
                            db.query("INSERT INTO users (first_name, last_name, email, photo, password) VALUES ('"+newUser.first_name+"', '"+newUser.last_name+"', '"+newUser.email+"', '"+newUser.photo+"')");
                            db.query("SELECT * FROM `users` WHERE `email` = '" + newUser.email + "'", function (err, row){
                                var newTwitter = new Object({
                                    id: profile.id,
                                    token: token,
                                    displayName: profile.displayName,
                                    username: profile. username,
                                    user_id: row.id
                                })
                                db.query("INSERT INTO twitter_logins (id, token, displayName, username, user_id) VALUES ('"+newTwitter.id+"', "+newTwitter.token+"', "+newTwitter.displayName+", "+newTwitter.username+", "+newTwitter.user_id+"')");
                            })
                        }
                    })
                })
            })
        }
    ))
    passport.use(new GoogleStrategy({
            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL,
        },
        function (token, refreshToken, profile, done){
            process.nextTick(function(){
                db.query("SELECT * FROM `google_logins` WHERE `id` = '" + profile.id + "'", function (err, user){
                    if (err){
                        return done(err);
                    }
                    if (user){
                        return done(null, user);
                    }
                    db.query("SELECT * FROM `users` WHERE `email` = '" + emails[0].value + "'", function (err, row){
                        if (row){
                            var google = new Object({
                                id: profile.id,
                                token: token,
                                user_id: row.id
                            });
                            db.query("INSERT INTO google_logins (id, token, user_id) VALUES ('"+google.id+"', "+google.token+"', "+google.user_id+"')");
                        } else {
                            var newUser = new Object({
                                email: profile.emails[0].value,
                                first_name: profile.name.givenName,
                                last_name: profile.name.familyName,
                                photo: profile.photos.value
                            });
                            db.query("INSERT INTO users (first_name, last_name, email, photo, password) VALUES ('"+newUser.first_name+"', '"+newUser.last_name+"', '"+newUser.email+"', '"+newUser.photo+"')");
                            db.query("SELECT * FROM `users` WHERE `email` = '" + newUser.email + "'", function (err, row){
                                var newGoogle = new Object({
                                    id: profile.id,
                                    token: token,
                                    user_id: row.id
                                })
                                db.query("INSERT INTO google_logins (id, token, user_id) VALUES ('"+newGoogle.id+"', "+newGoogle.token+"', "+newGoogle.user_id+"')");
                            })
                        }
                    })
                })
            })
        }
    ))    
}

