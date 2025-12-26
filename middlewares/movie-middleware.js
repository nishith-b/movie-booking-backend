const { ErrorResponseBody } = require("../utils/response-body");

const validateCreateMovieRequest = async (req, res, next) => {
  // validate the movie name
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
