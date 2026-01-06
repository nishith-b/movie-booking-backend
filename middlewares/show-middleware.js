const { StatusCodes } = require("http-status-codes");
const { ErrorResponseBody } = require("../utils/response-body");
const ObjectId = require("mongoose").Types.ObjectId;

const validateCreateShowRequest = async (req, res, next) => {
  //validate theatre id
  if (!req.body.theatreId) {
    ErrorResponseBody.err = "no theatre provided";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  if (!ObjectId.isValid(req.body.theatreId)) {
    ErrorResponseBody.err = "Invalid theatre id format";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate movie presence
  if (!req.body.movieId) {
    ErrorResponseBody.err = "No movie provided";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  if (!ObjectId.isValid(req.body.movieId)) {
    ErrorResponseBody.err = "Invalid movie id format";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate timing presence
  if (!req.body.timings) {
    ErrorResponseBody.err = "No timing provided";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate number of seats
  if (!req.body.noOfSeats) {
    ErrorResponseBody.err = "No seat info provided";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate price presence
  if (!req.body.price) {
    ErrorResponseBody.err = "No Price information provided";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }
  next();
};

const validateShowUpdateRequest = async (req, res, next) => {
  if (req.body.theatreId || req.body.movieId) {
    ErrorResponseBody.err =
      "Cannot update theatre or movie for an already added show";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }
  next();
};

module.exports = { validateCreateShowRequest, validateShowUpdateRequest };
