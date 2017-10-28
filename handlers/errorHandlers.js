//catch errors from route middleware
exports.catchErrors = (error) => {
  return function(req, res, next) {
    return error(req, res, next).catch(next);
  };
};

//404 page error
exports.notFound = (req, res, next) => {
  const err = new Error('Page not Found - 404 error');
  err.status = 404;
  next(err);
};

//development error, extended error message
exports.developmentErrors = (err, req, res, next) => {
  console.log('development error');
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack,
  };
  res.status(err.status || 500);
  console.log(err.stack, errorDetails);
  res.render('error', errorDetails);

};

//standard error message, without stacktrace and sensitive information
exports.productionErrors = (err, req, res, next) => {
  err.status = 500;
  const errorDetails = {
    status: err.status,
    message: 'Internal server error'
  };
  res.render('error', errorDetails);
};
