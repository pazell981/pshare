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

router.route('/:event_id').get(function(req, res) {
    res.redirect('/event/' + req.params.event_id);
})

router.route('/eventHome', function(req, res) {
    db.query("SELECT * FROM events_attended WHERE user_id=" + req.user.id, function(err, result) {
        if (result.length == 0) {
            res.render('lookup')
        } else if (result.length == 1) {
            console.log(result);
            res.redirect('/event/:event_id');
        } else {
            res.render('select');
        }
    });
})

router.route('event/:event_id').get(function(req, res) {
    db.query("SELECT * FROM events JOIN event_colors ON event.id = event_colors.event_id WHERE events.id=" + req.params.event_id, function(err, colors) {

    })
    db.query("SELECT * FROM events JOIN event_hero_images ON event.id = event_hero_images.event_id WHERE events.id=" + req.params.event_id, function(err, heroImages) {

    })
    res.render('event', {

    })
})



function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/eventHome')
    }
    res.redirect('/');
}

function hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};