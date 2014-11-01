var express = require('express');
var router = express.Router();
var db = require('../models');
var passport = require('passport');
var bcrypt = require('bcryptjs');
var multer = require('multer');
var fs = require('fs');

module.exports = function(app, passport) {
    app.use('/', router);
};

router.get('/', function(req, res) {
    res.redirect('/session');
});

router.route('/signup').post(function(req, res) {
    db.query("SELECT * FROM users WHERE email='" + req.body.email + "'", function(err, result) {
        if (!result.length) {
            req.flash('regMessage', 'This email is already registered, please log-in.');
            res.redirect('/');
        } else {
            var file = req.files.photo;
            fs.readFile(file.path, function(err, data) {
                var newPath = __dirname + "/../public/images/profiles/" + file.originalname;
                var pathEntry = "/public/images/profiles/" + file.originalname;
                fs.writeFile(newPath, data, function(err) {
                    if (err) {
                        console.log(err);
                    }
                });
                fs.unlinkSync(file.path);
                var newUser = new Object({
                    email: req.body.email,
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    photo: pathEntry,
                    password: hashPassword(req.body.password)
                });
                db.query("INSERT INTO users (first_name, last_name, email, photo, password) VALUES ('" + newUser.first_name + "', '" + newUser.last_name + "', '" + newUser.email + "', '" + newUser.photo + "', '" + newUser.password + "')");
                res.redirect('/eventHome');
            });
        }
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/eventHome')
    }
    res.redirect('/');
}

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};