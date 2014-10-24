var db = require('../config/mysql.js').db;
var bcrypt = require('bcryptjs');

var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;


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
         db.query("SELECT * FROM `facebook_logins` WHERE `email` = '" + email + "'",function(err,rows){
            if (err){
                return done(err);                
            }
            if (!rows.length) {
                return done(null, false, req.flash('loginMessage', 'User was not found.'));
            } 
            console.log(bcrypt.compareSync(password, rows[0].password));
            if (!bcrypt.compareSync(password, rows[0].password)){
                return done(null, false, req.flash('loginMessage', 'Oops! The password does not match the one on file.'));
            }
            return done(null, rows[0]);         
        });
    }));
    // passport.use(new FacebookStrategy({
    //     clientID: configAuth.facebookAuth.clientID,
    //     clientSecret: configAuth.facebookAuth.clientSecret,
    //     callbackURL: configAuth.facebookAuth.callbackURL
    // },
    // function (token, refreshToken, profile, done){
    //     process.nextTick(function(){
    //         db.query("SELECT * FROM `users` WHERE `email` = '" + email + "'",function(err,rows){}

    //     })
    // }
    // ))
}

