var http          = require('http'),
    path          = require('path'),
    express       = require('express'),
    cookieParser  = require('cookie-parser'),
    session       = require('express-session'),
    morgan        = require('morgan'),
    bodyParser    = require('body-parser'),
//    serveStatic   = require('serve-static'),
    passport      = require('passport'),
    suSAML        = require('passport-stanford'),
    app           = express(),
    acsPath       = '/saml/consume',
    loginPath     = '/login',
    saml;


app.use(morgan('dev'));

app.set('port', 3000);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
  secret: 'sooperS3CRET!',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secret: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());


console.error('creating strategy');
saml = new suSAML.Strategy({
  protocol:   'http://',
  idp:        'itlabv2',
  entityId:   'http://localhost/',
  path:       acsPath,
  loginPath:  loginPath,
  passReqToCallback: true,
  passport:   passport,
});

passport.use(saml);

passport.serializeUser(function(user, done){
    done(null, user);
});

passport.deserializeUser(function(user, done){
    done(null, user);
});

console.error('saml.name:', saml.name);
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('500', { error: err }); 
});

app.get('/', function(req, res) {
  res.render('home', {
    user: req.isAuthenticated() ? req.user : null,
    loginPath: loginPath,
	});
});

app.get(loginPath,
  passport.authenticate(saml.name),
  saml.return('/')
);

app.post(acsPath,
  passport.authenticate(saml.name),
  saml.return('/')
);

app.get('/metadata',
  saml.metadata()
);

app.get('/profile', 
  saml.protect(),
  function(req, res) {
    res.render('profile', { user : req.user	});
  }
);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/bad', function (req, res, next) {
  next(new Error('BAD!!!'));
});

app.use(express.static('public'));
app.use(function (req, res, next) {
  console.error('404',req.url);
  res.status(404);
  res.render('404', { url : req.url });
});

app.use(function (err, req, res, next) {
  console.error('500');
  res.status(500);
  res.render('500', { error: err });
});

http.createServer(app).listen(app.get('port'), function () {
  console.log("Express server listening on port " + app.get('port'));
});
