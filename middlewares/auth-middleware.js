const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user-service");
const { ErrorResponseBody } = require("../utils/response-body");
const { USER_ROLE } = require("../utils/constants");

/**
 * Validate request body for user signup
 *
 * @param req --> HTTP request object containing user details in body
 * @param res --> HTTP response object to be returned
 * @param next --> Next middleware function
 *
 * @returns --> Calls next middleware if request is valid, otherwise returns error response
 */
const validateSignupRequest = async (req, res, next) => {
  // validate name of the user
  if (!req.body.name) {
    ErrorResponseBody.err = "Name of the user not present in the request";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate email of the user
  if (!req.body.email) {
    ErrorResponseBody.err = "Email of the user not present in the request";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate password present of the user
  if (!req.body.password) {
    ErrorResponseBody.err = "Password of the user not present in the request";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  next();
};

/**
 * Validate request body for user signin
 *
 * @param req --> HTTP request object containing email and password in body
 * @param res --> HTTP response object to be returned
 * @param next --> Next middleware function
 *
 * @returns --> Calls next middleware if request is valid, otherwise returns error response
 */
const validateSigninRequest = async (req, res, next) => {
  // validate user email presence
  if (!req.body.email) {
    ErrorResponseBody.err = "No email provided for sign in";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate user password presence
  if (!req.body.password) {
    ErrorResponseBody.err = "No Password Provided for SignIn";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  next();
};

/**
 * Authenticate user using JWT token
 *
 * @param req --> HTTP request object containing JWT token in headers
 * @param res --> HTTP response object to be returned
 * @param next --> Next middleware function
 *
 * @returns --> Calls next middleware if token is valid, otherwise returns error response
 */
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) {
      ErrorResponseBody.err = "No token provided";
      return res.status(StatusCodes.FORBIDDEN).json(ErrorResponseBody);
    }

    const response = jwt.verify(token, process.env.AUTH_KEY);
    if (!response) {
      ErrorResponseBody.err = "Token not verified";
      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponseBody);
    }

    const user = await UserService.getUserById(response.id);
    req.user = user.id;
    next();
  } catch (error) {
    if (error.name == "JsonWebTokenError") {
      ErrorResponseBody.err = error.message;
      return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponseBody);
    }

    if (error.code == StatusCodes.NOT_FOUND) {
      ErrorResponseBody.err = "User doesnot exist";
      return res.status(error.code).json(ErrorResponseBody);
    }

    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

/**
 * Validate request body for password reset
 *
 * @param req --> HTTP request object containing oldPassword and newPassword in body
 * @param res --> HTTP response object to be returned
 * @param next --> Next middleware function
 *
 * @returns --> Calls next middleware if request is valid, otherwise returns error response
 */
const validateResetPasswordRequest = (req, res, next) => {
  // validate old password presence
  if (!req.body.oldPassword) {
    ErrorResponseBody.err = "Missing the old password in the request";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate new password presence
  if (!req.body.newPassword) {
    ErrorResponseBody.err = "Missing the new password in the request";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  next();
};

/**
 * Authorize admin-only access
 *
 * @param req --> HTTP request object containing authenticated user ID
 * @param res --> HTTP response object to be returned
 * @param next --> Next middleware function
 *
 * @returns --> Calls next middleware if user is admin, otherwise returns error response
 */
const isAdmin = async (req, res, next) => {
  const user = await UserService.getUserById(req.user);
  if (user.userRole !== USER_ROLE.admin) {
    ErrorResponseBody.err =
      "User is not an admin, cannot proceed with the request";
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponseBody);
  }
  next();
};

/**
 * Authorize client-only access
 *
 * @param req --> HTTP request object containing authenticated user ID
 * @param res --> HTTP response object to be returned
 * @param next --> Next middleware function
 *
 * @returns --> Calls next middleware if user is client, otherwise returns error response
 */
const isClient = async (req, res, next) => {
  const user = await UserService.getUserById(req.user);
  if (user.userRole !== USER_ROLE.client) {
    ErrorResponseBody.err =
      "User is not a client, cannot procees with a request";
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponseBody);
  }
  next();
};

/**
 * Authorize admin or client access
 *
 * @param req --> HTTP request object containing authenticated user ID
 * @param res --> HTTP response object to be returned
 * @param next --> Next middleware function
 *
 * @returns --> Calls next middleware if user is admin or client, otherwise returns error response
 */
const isAdminOrClient = async (req, res, next) => {
  const user = await UserService.getUserById(req.user);
  if (user.userRole !== USER_ROLE.admin && user.userRole !== USER_ROLE.client) {
    ErrorResponseBody.err =
      "User is neither a client nor an admin | Cannot procees a request";
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponseBody);
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
