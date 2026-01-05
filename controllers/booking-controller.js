const {
  ErrorResponseBody,
  SuccessResponseBody,
} = require("../utils/response-body");
const { StatusCodes } = require("http-status-codes");
const bookingService = require("../services/booking-service");

const create = async (req, res) => {
  try {
    let userId = req.user;
    const response = await bookingService.createBooking({
      ...req.body,
      userId: userId,
    });
    SuccessResponseBody.msg = "Suceessfully created a booking";
    SuccessResponseBody.data = response;
    return res.status(StatusCodes.CREATED).json(SuccessResponseBody);
  } catch (error) {
    if (error.err) {
      ErrorResponseBody.err = error.err;
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

module.exports = { create };
