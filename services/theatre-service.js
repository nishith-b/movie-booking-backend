const Theatre = require("../models/theatre");
const Movie = require("../models/movie");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

/**
 *
 * @param data --> object containing details of the theatre to be created
 * @returns --> object with the new theatre details
 */
const createTheatre = async (data) => {
  try {
    const response = await Theatre.create(data);
    return response;
  } catch (error) {
    if (error.name === "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    console.log(error);
    throw error;
  }
};

/**
 *
 * @param id --> unique id using which we can identify the theatre has to be deleted
 * @returns --> returns deleted theatre object
 */
const deleteTheatre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);
    if (!response) {
      throw {
        error: "No record of a theatre found for the given id",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *
 * @param id --> unique id which identifies theatres
 * @returns --> returns data of the particular theatre
 */
const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      // no record found for the given id
      throw {
        error: "No Theatre found for the given id",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *
 * @param data --> the data to be used to filter out theates based on city/pincode
 * @returns --> returns an object with the filtered content of theatres
 */
const getAllTheatres = async (data) => {
  try {
    let query = {};
    let pagination = {};
    if (data && data.city) {
      // this checks whether city is present in query params or not
      query.city = data.city;
    }
    if (data && data.pincode) {
      // this checks whether pincode is present in query params or not
      query.pincode = data.pincode;
    }

    if (data && data.name) {
      //checks whether name is present in query params or not
      query.name = data.name;
    }

    if (data && data.movieId) {
      query.movies = { $all: data.movieId };
    }

    if (data && data.limit) {
      pagination.limit = data.limit;
    }
    if (data && data.skip) {
      // skip indicates page number(eg: for first page skip is 0)
      let perPage = data.limit ? data.limit : 3;
      pagination.skip = data.skip * perPage;
    }
    const response = await Theatre.find(query, {}, pagination);
    if (!response || response.length === 0) {
      return {
        error: "No record of a theatre found for the given filter",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

/**
 *
 * @param id --> unique id to identify the theatre to be updated
 * @param data --> data to be used to update the thaetre
 * @returns --> returns new updated theatre object
 */
const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!response) {
      // no record found for the given id
      throw {
        error: "No Theatre found for the given id",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { error: err, code: StatusCodes.UNPROCESSABLE_ENTITY };
    }
    throw error;
  }
};

/**
 *
 * @param theatreId --> unique id of the theatres for which we want to update movies
 * @param movieIds --> array of movie ids that are expected to be updated in theatre
 * @param insert --> boolean that tells whether we want insert movies or remove them
 * @returns --> returns updated object
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
  try {
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      return {
        err: "No such theatre found for the id provided",
        code: StatusCodes.NOT_FOUND,
      };
    }

    if (insert) {
      // add movies (avoid duplicates)
      const existingMovieIds = new Set(
        theatre.movies.map((id) => id.toString())
      );

      movieIds.forEach((movieId) => {
        if (!existingMovieIds.has(movieId.toString())) {
          theatre.movies.push(movieId);
        }
      });
    } else {
      // remove movies
      theatre.movies = theatre.movies.filter(
        (movieId) => !movieIds.includes(movieId.toString())
      );
    }

    await theatre.save();
    return theatre.populate("movies");
  } catch (error) {
    if (error.name == "TypeError") {
      return {
        code: StatusCodes.NOT_FOUND,
        err: "No theatre found for the given id",
      };
    }
    console.log(error);
    throw error;
  }
};

const getMoviesInATheatre = async (id) => {
  try {
    // validate mongodb id format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return {
        err: "Invalid theatre id format",
        code: StatusCodes.BAD_REQUEST,
      };
    }

    const theatre = await Theatre.findById(id, {
      name: 1,
      movies: 1,
      address: 1,
    }).populate("movies");

    if (!theatre) {
      return {
        err: "No theatre with the given id found",
        code: StatusCodes.NOT_FOUND,
      };
    }

    return theatre;
  } catch (error) {
    console.error(error);
    return {
      err: "Internal server error",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

const checkMovieInATheatre = async (theatreId, movieId) => {
  try {
    let response = await Theatre.findById(theatreId);
    if (!response) {
      return {
        err: "No such theatre found for the given id",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return response.movies.includes(movieId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  createTheatre,
  deleteTheatre,
  getTheatre,
  getAllTheatres,
  updateTheatre,
  updateMoviesInTheatres,
  getMoviesInATheatre,
  checkMovieInATheatre,
};
