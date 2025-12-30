const { ErrorResponseBody } = require("../utils/response-body");

/**
 *
 * @param req --> HTTP request object
 * @param res --> HTTP response object
 * @param next --> next middleware function
 * @returns --> whether the request is valid or not
 */

const validateTheatreCreateRequest = async (req, res, next) => {
  if (!req.body.name) {
    ErrorResponseBody.message =
      "The name of the theatre is not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  if (!req.body.pincode) {
    ErrorResponseBody.message =
      "The pincode of the theatre is not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  if (!req.body.city) {
    ErrorResponseBody.message =
      "The city of the theatre is not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  next();
};

const validateUpdateMoviesRequest = async (req, res, next) => {
  // validation of insert parameter
  if (req.body.insert == undefined) {
    ErrorResponseBody.message =
      "The insert parameter is missing in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  // validate if movie ids present or not
  if (!req.body.movieIds) {
    ErrorResponseBody.message =
      "No movies present in the request to be updated in the theatre";
    return res.status(400).json(ErrorResponseBody);
  }

  // validate movie ids is an array
  if (!Array.isArray(req.body.movieIds)) {
    ErrorResponseBody.message =
      "Expected array of movies but found something else";
    return res.status(400).json(ErrorResponseBody);
  }

  // validate movie ids is not an empty array
  if (req.body.movieIds.length == 0) {
    ErrorResponseBody.message = "No movies present in the array provided";
    return res.status(400).json(ErrorResponseBody);
  }

  next();
};

module.exports = { validateTheatreCreateRequest, validateUpdateMoviesRequest };
