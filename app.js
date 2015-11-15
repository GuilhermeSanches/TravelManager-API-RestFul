require('getmodule');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');
var passport = require('passport');
var index = require('./routes/index');
var connection  = require('express-myconnection'); 
var mysql = require('mysql');
var app = express();
var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var cors = require('cors');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });
app.use(logger('dev'));
app.use(cors());
var SECRET = 'vibevendasehfodapracrlaee';
app.use('/login', expressJwt({secret: SECRET}));
app.use(passport.initialize());
app.use(passport.session());
app.set('jwtTokenSecret', 'vibevendasehfodapracrlaee');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    connection(mysql,{
        host: process.env.OPENSHIFT_MYSQL_DB_HOST,
        user: 'adminDu2UgjS',
        password : '93rsAGszR9bF',        
        database:'api'
    },'request')
);

//app.use(
//    connection(mysql,{
//        host: 'localhost',
//        user: 'root',
//        password : '',        
//        database:'api'
//    },'request')
//);

console.log(process.env.OPENSHIFT_MYSQL_DB_HOST);
app.use('/', index);

app.use(function(req, res, next) {
    req.app = app;
    next();
});



if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    });
}


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});


module.exports = app;
