const { StatusCodes } = require("http-status-codes");
const { ErrorResponseBody } = require("../utils/response-body");
const ObjectId = require("mongoose").Types.ObjectId;

const verifyPaymentCreateRequest = async (req, res, next) => {
  // validate booking id presence
  if (!req.body.bookingId) {
    ErrorResponseBody.err = "No booking id recieved";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate correct bookingid
  if (!ObjectId.isValid(req.body.bookingId)) {
    ErrorResponseBody.err = "Invalid Booking Id";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // validate amount presence
  if (!req.body.amount) {
    ErrorResponseBody.err = "No amount sent";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }

  // everything is fine
  next();
};

module.exports = { verifyPaymentCreateRequest };
