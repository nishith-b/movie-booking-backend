const Show = require("../models/show");
const Theatre = require("../models/theatre");
const { StatusCodes } = require("http-status-codes");

const createShow = async (data) => {
  try {
    const theatre = await Theatre.findById(data.theatreId);
    if (!theatre) {
      throw {
        err: "No theatre found",
        code: StatusCodes.NOT_FOUND,
      };
    }

    if (!theatre.movies.includes(data.movieId)) {
      throw {
        err: "No movie found in given theatre",
        code: StatusCodes.NOT_FOUND,
      };
    }
    const response = await Show.create(data);
    return response;
  } catch (error) {
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

module.exports = {
  createShow,
};
