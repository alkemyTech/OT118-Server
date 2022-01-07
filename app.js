const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const options = require('./docs/swaggerOptions');
require('dotenv').config();
const fileUpload = require('express-fileUpload');

const indexRouter = require('./routes/index');
const SPECS = swaggerJsDoc(options)

const app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/docs', swaggerUI.serve , swaggerUI.setup(SPECS))

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res,next) => {
  const isDevEnv = req.app.get('env') === 'development';
  if(isDevEnv) err.stackTrace = err.stack;
  if (!err.msg) err.msg = err.message;
  delete err.message;
  res.status(err.status).json(err);
});


module.exports = app;
