const { ErrorResponseBody } = require("../utils/response-body");

/**
 *
 * @param req --> HTTP request object
 * @param res --> HTTP response object
 * @param next --> next middleware function
 * @returns --> whether the request is valid or not
 */

const validateCreateMovieRequest = async (req, res, next) => {
  if (!req.body.name) {
    ErrorResponseBody.err =
      "The name of the movie is not present in the request sent";
    return res.status(400).json(ErrorResponseBody);
  }

  if (!req.body.description) {
    ErrorResponseBody.err =
      "The description of the movie not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  if (
    !req.body.casts ||
    req.body.casts.length == 0 ||
    !Array.isArray(req.body.casts)
  ) {
    ErrorResponseBody.err = "The cast of the movie not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  if (!req.body.trailerURL) {
    ErrorResponseBody.err =
      "The Trailer URL of the movie not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  if (!req.body.releaseDate) {
    ErrorResponseBody.err =
      "The Releaese Date of the movie not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  if (!req.body.director) {
    ErrorResponseBody.err =
      "The Director of the movie not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  next();
};
module.exports = {
  validateCreateMovieRequest,
};
