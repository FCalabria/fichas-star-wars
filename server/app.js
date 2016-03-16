(function() {
    'use strict';

    var express = require('express'),
    path = require('path'),
  //  logger = require('morgan'),
  //  cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),

    routes = require('./scripts/index.js'),

    app = express();

    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

  //app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
  //  app.use(cookieParser());

    app.use(express.static(path.join(__dirname, '../app')));
    app.use('/bower_components',  express.static( path.join(__dirname, '../bower_components')));
    app.use('/fonts',  express.static( path.join(__dirname, '../bower_components/bootstrap/fonts')));

    app.all('*', function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With,X-Powered-By,Content-Type");
        if (req.method === 'OPTIONS') {
            res.status(200).end();
        } else {
            next();
        }
    });

    app.use('/', routes);

    app.set('port', process.env.PORT || 9000);

    var server = app.listen(app.get('port'), function() {
        console.log('Express server listening on port ' + server.address().port);
    });

    module.exports = app;
}());
