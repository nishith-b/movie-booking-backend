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

const update = async (req, res) => {
  try {
    const response = await bookingService.updateBooking(
      req.params.id,
      req.body
    );
    (SuccessResponseBody.data = response),
      (SuccessResponseBody.message = "Successfully updated the booking");
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
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

const getBookings = async (req, res) => {
  try {
    const response = await bookingService.getBookings({ userId: req.user });
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully fetched the bookings";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

const getAllBookings = async (req, res) => {
  try {
    const response = await bookingService.getAllBookings();
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully fetched the bookings";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

const getBookingById = async (req, res) => {
  try {
    const response = await bookingService.getBookingById(
      req.params.id,
      req.user
    );
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully fetched the booking";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
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

module.exports = {
  create,
  update,
  getBookings,
  getAllBookings,
  getBookingById,
};
