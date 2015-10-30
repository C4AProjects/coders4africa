'use strict';

// Error handling

/**
 * Load Module Dependencies.
 */
var debug   = require('debug')('c4A-api:error-handlers');


/**
 * create a bad request response
 *
 * @param {Object|String} msg Error Message
 *
 * @return {Object}
 */
exports.badRequest = function createBadRequestMessage(msg) {
  return {
    errors: {
      status: 400,
      message: msg
    }
  };
};

/**
 * create a not found response
 *
 * @param {Object|String} msg Error Message
 *
 * @return {Object}
 */
exports.notFound = function createNotFoundMessage(msg) {
  return {
    errors: {
      status: 404,
      message: msg
    }
  };
};

/**
 * create a forbidden response
 *
 * @param {Object|String} msg Error Message
 *
 * @return {Object}
 */
exports.forbidden = function createForbiddenMessage(msg,code) {
  return {
    errors: {
      status: 403,
      message: msg,
      code:code
    }
  };
};

/**
 * Handler for 404 errors
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} req HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.notFoundError = function notFoundErrorHandler(req, res, next) {
  debug('responding to a 404 error: ' + req.url);

  res.status(404).json(exports.notFound('Not Found'));
};

/**
 * Handler for 403 errors
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} req HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.forbiddenError = function forbiddenErrorHandler(err, req, res, next) {

  if(err.status === 403) {
    debug('responding to a 403 error ', req.url);
    return res.status(403).json(exports.forbidden('Access Denied'));
  }else if (err.status === 401) {
   var message='Access Denied'
    if (err.code=='invalid_token') message="Invalid Token"
    if (err.code=='invalid_token' && err.inner.name=='TokenExpiredError') message="Session Expired"
    return res.status(401).json(exports.forbidden(message,err.code));

  }
  else {
    return next(err);
  }
};

/**
 * Handler for 500 errors
 *
 * @param {Object} req HTTP Request Object
 * @param {Object} req HTTP Response Object
 * @param {Function} next Middleware dispatcher
 */
exports.serverError = function serverErrorHandler(err, req, res, next) {
  debug('responding to a 500 server error ', req.url);

  return res.status(500)
      .json({
        errors: {
          status: 500,
          message: err.message
        }
      });
  // Production 500 error handler - no stacktraces leakeage
  //if(config.env === 'production') {
  //} else {
  //return res.status(500)
  //.json({
  //errors: {
  //status: 500,
  //message: err.message
  //}
  //});
  //}
};


