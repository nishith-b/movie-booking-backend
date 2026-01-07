const Payment = require("../models/payment");
const Booking = require("../models/booking");
const { StatusCodes } = require("http-status-codes");
const { BOOKING_STATUS, PAYMENT_STATUS } = require("../utils/constants");

const createPayment = async (data) => {
  try {
    const booking = await Booking.findById(data.bookingId);
    if (booking.status == BOOKING_STATUS.successfull) {
      throw {
        err: "Booking already done, cannot make a new payment for it",
        code: StatusCodes.FORBIDDEN,
      };
    }
    if (!booking) {
      throw {
        err: "No bookign found",
        code: StatusCodes.NOT_FOUND,
      };
    }
    let bookingTime = booking.createdAt.getTime();
    let currentTime = Date.now();

    // calculate how many minutes remaining
    let minutes = Math.floor((currentTime - bookingTime) / 1000 / 60);
    if (minutes > 5) {
      booking.status = BOOKING_STATUS.expired;
      await booking.save();
      return booking;
    }
    const payment = await Payment.create({
      bookingId: data.bookingId,
      amount: data.amount,
    });

    if (payment.amount !== booking.totalCost) {
      payment.status = PAYMENT_STATUS.failed;
    }

    if (!payment || payment.status == PAYMENT_STATUS.failed) {
      booking.status = BOOKING_STATUS.cancelled;
      await booking.save();
      await payment.save();
      return booking;
    }

    payment.status = PAYMENT_STATUS.success;
    booking.status = BOOKING_STATUS.successfull;
    await booking.save();
    await payment.save();
    return booking;
  } catch (error) {
    throw error;
  }
};

const getPaymentsById = async (id) => {
  try {
    const response = await Payment.findById(id).populate("bookingId");
    if (!response) {
      throw {
        err: "No Payment Record Found",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    throw error;
  }
};

module.exports = { createPayment, getPaymentsById };
