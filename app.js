let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let dotenv = require('dotenv');
let cors = require('cors')

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/user');
let contatoRouter = require('./routes/contato');
let db = require('./config/db');
let deleteAccount = require('./utils/deleteAccounts')

let app = express();

// config dotenv and sequelize
dotenv.config();
db.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use (
  cors ({
    origin: "*",
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contato', contatoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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


setInterval(deleteAccount, 60 * 60 * 1000);// chama a função de exclusão a cada 1 hora

// cron.schedule('*/59 * * * *', () => {
//   deleteAccount()
// }, {
//   scheduled: true,
//   timezone: "America/Sao_Paulo"
// });

module.exports = app;
