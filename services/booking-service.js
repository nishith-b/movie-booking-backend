const { StatusCodes } = require("http-status-codes");
const Booking = require("../models/booking");
const Show = require("../models/show");

const createBooking = async (data) => {
  try {
    console.log(data);

    const timing = data.timings.replace(/"/g, "");
    const noOfSeats = Number(data.noOfSeats);

    if (Number.isNaN(noOfSeats)) {
      throw new Error("Invalid seat count");
    }

    const show = await Show.findOne({
      movieId: data.movieId,
      theatreId: data.theatreId,
      timings: timing,
    });

    if (!show) {
      throw {
        err: "Show not found for given timing",
        code: 404,
      };
    }

    data.totalCost = noOfSeats * show.price;

    const response = await Booking.create(data);
    show.noOfSeats -= data.noOfSeats;
    await show.save();
    return response;
  } catch (error) {
    console.log(error);
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    throw error;
  }
};

const updateBooking = async (bookingId, data) => {
  try {
    const response = await Booking.findByIdAndUpdate(bookingId, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      throw {
        err: "No Booking found for the given id",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS };
    }
    console.log(error);
    throw error;
  }
};

const getBookings = async (data) => {
  try {
    const response = await Booking.find(data);
    return response;
  } catch (error) {
    throw error;
  }
};

const getAllBookings = async () => {
  try {
    const response = await Booking.find();
    return response;
  } catch (error) {
    throw error;
  }
};

const getBookingById = async (id, userId) => {
  try {
    const response = await Booking.findById(id);
    console.log(response);
    if (!response) {
      throw {
        err: "No booking records found for the id",
        code: StatusCodes.NOT_FOUND,
      };
    }

    if (!response.userId.equals(userId)) {
      throw {
        err: "Not able to access the booking",
        code: StatusCodes.UNAUTHORIZED,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createBooking,
  updateBooking,
  getBookings,
  getAllBookings,
  getBookingById,
};
