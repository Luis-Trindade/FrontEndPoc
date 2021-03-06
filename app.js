var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
var auth = require("./modules/authPassport")();

var hbs = require('hbs');

var index = require('./routes/index');
var clientes = require('./routes/clientes');
var cliente = require('./routes/cliente')
var simul = require('./routes/simul');
var login = require('./routes/login');
var logout = require('./routes/logout');
var apiclientes = require('./routes/apiclientes');
var apicontra = require('./routes/apicontra');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// partiais
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('isEqual', function (expectedValue, value) {
    return value === expectedValue;
});

hbs.registerHelper('section', function(name, options){
        if(!this._sections) this._sections = {};
        this._sections[name] = options.fn(this);
        return null;
});

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '/public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(auth.initialize());

/* configurar o CORS */
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/login', login);
app.use('/logout',logout);
// para datatables api -> faz o bridge para o lease api
app.use('/api/clientes', apiclientes);
app.use('/api/contra', apicontra);

app.use('/clientes', auth.authenticate(), clientes);
app.use('/cliente',auth.authenticate(),cliente);
app.use('/simul',auth.authenticate(),simul);
app.use('/', auth.authenticate(), index);
//app.use('/simul',simul);




// se quisermos forçar o layout.hbs com outro nome...
// app.set('view options', { layout: 'other' });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
