const { ErrorResponseBody } = require("../utils/response-body");

/**
 * validator for user signup
 * @param req --> http request object
 * @param res --> http response object
 * @param next --> next middleware
 * @returns
 */
const validateSignupRequest = async (req, res, next) => {
  // validate name of the user
  if (!req.body.name) {
    ErrorResponseBody.err = "Name of the user not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  // validate email of the user
  if (!req.body.email) {
    ErrorResponseBody.err = "Email of the user not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  // validate password present of the user
  if (!req.body.password) {
    ErrorResponseBody.err = "Password of the user not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  next();
};

/**
 * validator for user signin
 * @param req --> http request object
 * @param res --> http response object
 * @param next --> next middleware
 * @returns
 */
const validateSigninRequest = async (req, res, next) => {
  // validate user email presence
  if (!req.body.email) {
    ErrorResponseBody.err = "No email provided for sign in";
    return res.status(400).json(ErrorResponseBody);
  }

  // validate user password presence
  if (!req.body.password) {
    ErrorResponseBody.err = "No Password Provided for SignIn";
    return res.status(400).json(ErrorResponseBody);
  }

  // request is valid
  next();
};

module.exports = {
  validateSignupRequest,
  validateSigninRequest,
};
