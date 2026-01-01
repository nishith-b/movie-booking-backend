const jwt = require("jsonwebtoken");
const UserService = require("../services/user-service");
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

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      ErrorResponseBody.err = "No token provided";
      return res.status(403).json(ErrorResponseBody);
    }
    const response = jwt.verify(token, process.env.AUTH_KEY);
    if (!response) {
      ErrorResponseBody.err = "Token not verified";
      return res.status(401).json(ErrorResponseBody);
    }
    const user = await UserService.getUserById(response.id);
    req.user = user.id;
    next();
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      ErrorResponseBody.err = error.message;
      return res.status(401).json(ErrorResponseBody);
    }
    if (error.code == 404) {
      ErrorResponseBody.err = "User doesnot exist";
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res.status(500).json(ErrorResponseBody);
  }
};

module.exports = {
  validateSignupRequest,
  validateSigninRequest,
  isAuthenticated,
};
