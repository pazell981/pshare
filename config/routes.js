module.exports = function Routes(app, passport) {
    app.get('/', function(req, res) {
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
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/',
        failureFlash : true
    }));
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile',
        failureRedirect : '/login',
        failureFlash : true
    }));
}

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}
