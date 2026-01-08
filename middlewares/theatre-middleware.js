const { StatusCodes } = require("http-status-codes");
const { ErrorResponseBody } = require("../utils/response-body");

/**
 * Validate request body for creating a theatre
 *
 * @param req --> HTTP request object containing theatre details in body
 * @param res --> HTTP response object to be returned
 * @param next --> Next middleware function
 *
 * @returns --> Calls next middleware if request is valid, otherwise returns error response
 */
const validateTheatreCreateRequest = async (req, res, next) => {
  if (!req.body.name) {
    ErrorResponseBody.message =
      "The name of the theatre is not present in the request";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  if (!req.body.pincode) {
    ErrorResponseBody.message =
      "The pincode of the theatre is not present in the request";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  if (!req.body.city) {
    ErrorResponseBody.message =
      "The city of the theatre is not present in the request";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  next();
};

/**
 * Validate request body for updating movies in a theatre
 *
 * @param req --> HTTP request object containing movieIds array and insert flag in body
 * @param res --> HTTP response object to be returned
 * @param next --> Next middleware function
 *
 * @returns --> Calls next middleware if request is valid, otherwise returns error response
 */
const validateUpdateMoviesRequest = async (req, res, next) => {
  // validation of insert parameter
  if (req.body.insert == undefined) {
    ErrorResponseBody.err = "The insert parameter is missing in the request";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate if movie ids present or not
  if (!req.body.movieIds) {
    ErrorResponseBody.err =
      "No movies present in the request to be updated in the theatre";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate movie ids is an array
  if (!Array.isArray(req.body.movieIds)) {
    ErrorResponseBody.err = "Expected array of movies but found something else";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate movie ids is not an empty array
  if (req.body.movieIds.length == 0) {
    ErrorResponseBody.err = "No movies present in the array provided";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  next();
};

module.exports = {
  validateTheatreCreateRequest,
  validateUpdateMoviesRequest,
};
