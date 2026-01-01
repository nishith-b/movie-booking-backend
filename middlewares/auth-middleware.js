const jwt = require("jsonwebtoken");
const UserService = require("../services/user-service");
const { ErrorResponseBody } = require("../utils/response-body");
const { USER_ROLE } = require("../utils/constants");

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

const validateResetPasswordRequest = (req, res, next) => {
  // validate old password presence
  if (!req.body.oldPassword) {
    ErrorResponseBody.err = "Missing the old password in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  // validate new password presence
  if (!req.body.newPassword) {
    ErrorResponseBody.err = "Missing the new password in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  // we can proceed
  next();
};

const isAdmin = async (req, res, next) => {
  const user = await UserService.getUserById(req.user);
  if (user.userRole !== USER_ROLE.admin) {
    ErrorResponseBody.err =
      "User is not an admin, cannot proceed with the request";
    return res.status(401).json(ErrorResponseBody);
  }
  next();
};

const isClient = async (req, res, next) => {
  const user = await UserService.getUserById(req.user);
  if (user.userRole !== USER_ROLE.client) {
    ErrorResponseBody.err =
      "User is not a client, cannot procees with a request";
    return res.status(401).json(ErrorResponseBody);
  }
  next();
};

const isAdminOrClient = async (req, res, next) => {
  const user = await UserService.getUserById(req.user);
  if (user.userRole !== USER_ROLE.admin && user.userRole !== USER_ROLE.client) {
    ErrorResponseBody.err =
      "User is neither a client nor an admin | Cannot procees a request";
    return res.status(401).json(ErrorResponseBody);
  }

  next();
};

module.exports = {
  validateSignupRequest,
  validateSigninRequest,
  validateResetPasswordRequest,
  isAuthenticated,
  isAdmin,
  isClient,
  isAdminOrClient,
};
