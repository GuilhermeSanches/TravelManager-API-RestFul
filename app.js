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
var FacebookStrategy = require('passport-facebook').Strategy

// This is where all the magic happens!
app.engine('html', swig.renderFile);

app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', false);
// To disable Swig's cache, do the following:
swig.setDefaults({ cache: false });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(cors());
var SECRET = 'vibevendasehfodapracrlaee';
app.use('/login', expressJwt({secret: SECRET}));

passport.use(new FacebookStrategy({
    clientID: "435532409982894",
    clientSecret: "086f3074dbae7efd35a25271876004a9",
    callbackURL: "http://web-travelmanager.rhcloud.com/auth/facebook/callback",
    enableProof: false
  },
 function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      
      // To keep the example simple, the user's Facebook profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Facebook account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

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

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
    return next();
});


app.get('/auth/facebook',
  passport.authenticate('facebook'),
  function(req, res){
    // The request will be redirected to Facebook for authentication, so this
    // function will not be called.
  });

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/viagens');
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

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

module.exports = app;
