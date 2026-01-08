const { StatusCodes } = require("http-status-codes");
const paymentService = require("../services/payment-service");
const { BOOKING_STATUS } = require("../utils/constants");
const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");
const axios = require("axios");
const User = require("../models/user");
const Movie = require("../models/movie");
const Theatre = require("../models/theatre");

const createPayment = async (req, res) => {
  try {
    const response = await paymentService.createPayment(req.body);

    if (response.status == BOOKING_STATUS.expired) {
      ErrorResponseBody.err =
        "The payment took more than 5 minutes to get processed, hence your booking got expired..! Please Try Again...!";
      ErrorResponseBody.data = response;
      return res.status(StatusCodes.GONE).json(ErrorResponseBody);
    }
    if (response.status == BOOKING_STATUS.cancelled) {
      ErrorResponseBody.err =
        "The payment failed due to some reason, booking was not successful, please try again";
      ErrorResponseBody.data = response;
      return res.status(StatusCodes.PAYMENT_REQUIRED).json(ErrorResponseBody);
    }
    const user = await User.findById(response.userId);
    const movie = await Movie.findById(response.movieId);
    const theatre = await Theatre.findById(response.theatreId);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Booking Completed Successfully..!";
    axios.post(process.env.NOTI_SERVICE + "/notiservice/api/v1/notifications", {
      subject: "Your Booking is Successfull",
      recepientEmails: [user.email],
      content: `Your Booking for ${movie.name} in ${theatre.name} for ${response.noOfSeats} on ${response.timings} is Successfull.Your booking id is ${response.id} `,
    });
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

const getPaymentsDetailsById = async (req, res) => {
  try {
    const response = await paymentService.getPaymentsById(req.params.id);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message =
      "Successfully fetched the booking and payment details";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    console.log(error);
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

const getAllPayments = async (req, res) => {
  try {
    const response = await paymentService.getAllPayments(req.user);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully fetched all the payments";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    console.log(error);
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

module.exports = { createPayment, getPaymentsDetailsById, getAllPayments };
