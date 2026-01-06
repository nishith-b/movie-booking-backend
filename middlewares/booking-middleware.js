const { StatusCodes } = require("http-status-codes");
const { ErrorResponseBody } = require("../utils/response-body");

const ObjectId = require("mongoose").Types.ObjectId;

const theatreService = require("../services/theatre-service");
const userService = require("../services/user-service");
const { USER_ROLE, BOOKING_STATUS } = require("../utils/constants");

const validateCreateBookingRequest = async (req, res, next) => {
  try {
    // validate the theatre id presence in request body
    if (!req.body.theatreId) {
      ErrorResponseBody.err = "No Theatre id found";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
    }

    // validate correct theatre id format
    if (!ObjectId.isValid(req.body.theatreId)) {
      ErrorResponseBody.err = "Invalid Theatre id provided";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
    }

    // validate presence of theatre for given id
    const theatre = await theatreService.getTheatre(req.body.theatreId);
    if (!theatre) {
      ErrorResponseBody.err = "No Theatre found for the given id";
      return res.status(StatusCodes.NOT_FOUND).json(ErrorResponseBody);
    }

    // validate movie presence
    if (!req.body.movieId) {
      ErrorResponseBody.err = "No movie id present";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
    }

    // validate correct movie id format
    if (!ObjectId.isValid(req.body.movieId)) {
      ErrorResponseBody.err = "Invalid movie id format";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
    }

    // validate presence of movie in given theatre (note: movie must present i.e running in given theatre, not only exist in DB)
    if (!theatre.movies.includes(req.body.movieId)) {
      ErrorResponseBody.err =
        "Given movie is not available in the requested theatre";
      return res.status(StatusCodes.NOT_FOUND).json(ErrorResponseBody);
    }

    // validate presence of timing
    if (!req.body.timings) {
      ErrorResponseBody.err = "Timing is not present in given request body";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
    }

    // validate no of seats presence
    if (!req.body.noOfSeats) {
      ErrorResponseBody.err = "Number seats is not provided";
      return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
    }

    // request is correct
    next();
  } catch (error) {
    ErrorResponseBody.err =
      "Something went wrong while validating booking request";
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ErrorResponseBody,
    });
  }
};

// Customer only allowed to cancel booking
const canChangeStatus = async (req, res, next) => {
  const user = await userService.getUserById(req.user);
  if (
    user.userRole == USER_ROLE.customer &&
    req.body.status &&
    req.body.status !== BOOKING_STATUS.cancelled
  ) {
    ErrorResponseBody.err = "You are not allowed to change the booking status";
    return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponseBody);
  }
  next();
};

module.exports = {
  validateCreateBookingRequest,
  canChangeStatus,
};
