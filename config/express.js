var express = require('express');
var glob = require('glob');

var favicon = require('serve-favicon');
var fs = require('fs');
var logger = require('morgan');
var multer = require('multer');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');
var compress = require('compression');
var methodOverride = require('method-override');
var LocalStrategy = require('passport-local');
var TwitterStrategy = require('passport-twitter');
var GoogleStrategy = require('passport-google');
var FacebookStrategy = require('passport-facebook');
var http = require('http');
var url = require('url');

module.exports = function(app, config) {
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'ejs');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());
  app.use(session({secret: 'supernova', saveUninitialized: true, resave: true}));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(multer({dest: "uploads/"}))
  app.use(flash());

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller){
    require(controller)(app);
  });

  // app.use(function (req, res, next){
  //   var err = new Error('Not Found');
  //   err.status = 404;
  //   next(err);
  // });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res){
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res){
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};
