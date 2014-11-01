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

router.route('/session').get(function (res, req){
	var agent = req.header('user-agent');
	if (/mobile/i.test(agent)) {
	    res.render('mobile', {
	        title: 'Remember When We...',
	        event: '',
	        image1: './img/wedding-party.jpg',
	        image1Alt: 'Wedding Party',
	        image1Caption: 'Weddings',
	        image2: './img/corporate-event.jpg',
	        image2Alt: 'Corporate Events',
	        image2Caption: 'Corporate Events',
	        image3: './img/special-event.jpg',
	        image3Alt: 'Special Events',
	        image3Caption: 'Special Events',
	        loginMessage: '' || req.flash("loginMessage"),
	        regMessage: '' || req.flash("regMessage")
	    });
	} else {
	    res.render('index', {
	        title: 'Remember When We...',
	        event: '',
	        image1: './img/wedding-party.jpg',
	        image1Alt: 'Wedding Party',
	        image1Caption: 'Weddings',
	        image2: './img/corporate-event.jpg',
	        image2Alt: 'Corporate Events',
	        image2Caption: 'Corporate Events',
	        image3: './img/special-event.jpg',
	        image3Alt: 'Special Events',
	        image3Caption: 'Special Events',
	        loginMessage: '' || req.flash("loginMessage"),
	        regMessage: '' || req.flash("regMessage")
	    });
	}
})

router.route('/session').post(passport.authenticate('local-login', {
    successRedirect: '/eventHome',
    failureRedirect: '/',
    failureFlash: true
}));

router.route('/session/auth/facebook').post(passport.authenticate('facebook', {
    scope: 'email'
}));

router.route('/session/auth/facebook/callback').post(passport.authenticate('facebook', {
    successRedirect: '/eventHome',
    failureRedirect: '/'
}))

router.route('/session/auth/google').post(passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.route('/session/auth/google/callback').post(passport.authenticate('google', {
    successRedirect: '/eventHome',
    failureRedirect: '/'
}));

router.route('/session/auth/twitter').post(passport.authorize('twitter', {
    scope: 'email'
}));

router.route('/session/auth/twitter/callback').post(
    passport.authenticate('twitter', {
        successRedirect: '/eventHome',
        failureRedirect: '/'
    })
);

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/eventHome')
    }
    res.redirect('/');
}

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};