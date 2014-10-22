var db = require('../config/mysql.js').db;
var bcrypt = require('bcryptjs');
var multer = require('multer');
var fs = require('fs');
db.connect();

module.exports = function Routes(app, passport) {
    app.get('/', function (req, res){
        var agent = req.header('user-agent');
        if (/mobile/i.test(agent)) {
            res.render('mobile', {
                title: 'Remember When We...',
                event: '',
                image1: './images/wedding-party.jpg',
                image1Alt: 'Wedding Party',
                image1Caption: 'Weddings',
                image2: './images/corporate-event.jpg',
                image2Alt: 'Corporate Events',
                image2Caption: 'Corporate Events',
                image3: './images/special-event.jpg',
                image3Alt: 'Special Events',
                image3Caption: 'Special Events',
                loginMessage: '' || req.flash("loginMessage"),
                regMessage: '' || req.flash("regMessage")
            });
        } else {
            res.render('index', {
                title: 'Remember When We...',
                event: '',
                image1: './images/wedding-party.jpg',
                image1Alt: 'Wedding Party',
                image1Caption: 'Weddings',
                image2: './images/corporate-event.jpg',
                image2Alt: 'Corporate Events',
                image2Caption: 'Corporate Events',
                image3: './images/special-event.jpg',
                image3Alt: 'Special Events',
                image3Caption: 'Special Events',
                loginMessage: '' || req.flash("loginMessage"),
                regMessage: '' || req.flash("regMessage")
            });
        }
    });

    app.get('/', function (req, res){

    })

    app.post('/signup', function (req, res){
        db.query("SELECT * FROM users WHERE email='" + req.body.email+"'",function(err, result, fields){
            if(result.length!=0){
                req.flash('regMessage', 'This email is already registered, please log-in.');
                res.redirect('/');
            } else {
                var file = req.files.photo;
                fs.readFile(file.path, function(err, data){
                    var newPath = __dirname + "/../public/images/profiles/" +file.originalname;
                    var pathEntry = "/public/images/profiles/"+file.originalname;
                    fs.writeFile(newPath, data, function(err){
                        if(err) {
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
                    db.query("INSERT INTO users (first_name, last_name, email, photo, password) VALUES ('"+newUser.first_name+"', '"+newUser.last_name+"', '"+newUser.email+"', '"+newUser.photo+"', '"+newUser.password+"')");
                    res.redirect('/eventHome');
                });
            }
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/eventHome',
        failureRedirect : '/',
        failureFlash : true
    }));

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/eventHome',
        failureRedirect: '/'
    }))
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()){
        res.redirect('/eventHome')
    }
    res.redirect('/'); 
}

function hashPassword (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
