const { StatusCodes } = require("http-status-codes");
const paymentService = require("../services/payment-service");
const { BOOKING_STATUS } = require("../utils/constants");
const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");

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

    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Booking Completed Successfully..!";
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
    console.log(error)
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

module.exports = { createPayment, getPaymentsDetailsById, getAllPayments };
