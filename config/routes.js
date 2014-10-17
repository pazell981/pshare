var passport = require('passport');

module.exports = function Routes(app) {
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
                image3Caption: 'Special Events'
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
                image3Caption: 'Special Events'
            });
        }
    });
    app.post('/local-reg', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signin'
    }));
    app.post('/login', passport.authenticate('local-signin', {
        successRedirect: '/',
        failureRedirect: '/signin'
    }));
    app.get('/auth/facebook', passport.authenticate('facebook'));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/home',
            failureRedirect: '/'
        }));
    app.get('/auth/facebook',
        passport.authenticate('facebook'),
        function(req, res) {});
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            failureRedirect: '/'
        }),
        function(req, res) {
            res.redirect('/account');
        });
    app.get('/auth/google',
        passport.authenticate('google'),
        function(req, res) {});
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            failureRedirect: '/'
        }),
        function(req, res) {
            res.redirect('/account');
        });
    app.get('/auth/twitter', passport.authenticate('twitter'));

    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
}