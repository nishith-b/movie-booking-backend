const Theatre = require("../models/theatre");
const Movie = require("../models/movie");
const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");

/**
 * Create a new theatre
 *
 * @param data --> Object containing theatre details
 * @returns --> Returns the created theatre object
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
 * Delete a theatre by ID
 *
 * @param id --> Theatre ID
 * @returns --> Returns the deleted theatre object
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
 * Get a theatre by ID
 *
 * @param id --> Theatre ID
 * @returns --> Returns the theatre object
 */
const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
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
 * Get all theatres based on filter
 *
 * @param data --> Filter object containing city, pincode, name, movieId, limit, skip
 * @returns --> Returns an array of theatres matching the filter
 */
const getAllTheatres = async (data) => {
  try {
    let query = {};
    let pagination = {};

    if (data?.city) query.city = data.city;
    if (data?.pincode) query.pincode = data.pincode;
    if (data?.name) query.name = data.name;
    if (data?.movieId) query.movies = { $all: data.movieId };

    if (data?.limit) pagination.limit = data.limit;
    if (data?.skip) {
      let perPage = data.limit ? data.limit : 3;
      pagination.skip = data.skip * perPage;
    }

    const response = await Theatre.find(query, {}, pagination);
    if (!response || response.length === 0) {
      throw {
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
 * Update a theatre by ID
 *
 * @param id --> Theatre ID
 * @param data --> Object containing fields to update
 * @returns --> Returns the updated theatre object
 */
const updateTheatre = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!response) {
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
 * Update movies in a theatre
 *
 * @param theatreId --> Theatre ID
 * @param movieIds --> Array of movie IDs to add/remove
 * @param insert --> Boolean flag: true to add, false to remove
 * @returns --> Returns the updated theatre object
 */
const updateMoviesInTheatres = async (theatreId, movieIds, insert) => {
  try {
    const theatre = await Theatre.findById(theatreId);
    if (!theatre) {
      throw {
        err: "No such theatre found for the id provided",
        code: StatusCodes.NOT_FOUND,
      };
    }

    if (insert) {
      const existingMovieIds = new Set(theatre.movies.map((id) => id.toString()));
      movieIds.forEach((movieId) => {
        if (!existingMovieIds.has(movieId.toString())) {
          theatre.movies.push(movieId);
        }
      });
    } else {
      theatre.movies = theatre.movies.filter(
        (movieId) => !movieIds.includes(movieId.toString())
      );
    }

    await theatre.save();
    return theatre.populate("movies");
  } catch (error) {
    if (error.name == "TypeError") {
      throw {
        code: StatusCodes.NOT_FOUND,
        err: "No theatre found for the given id",
      };
    }
    console.log(error);
    throw error;
  }
};

/**
 * Get movies in a theatre
 *
 * @param id --> Theatre ID
 * @returns --> Returns the theatre object with populated movies
 */
const getMoviesInATheatre = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw {
        err: "Invalid theatre id format",
        code: StatusCodes.BAD_REQUEST,
      };
    }

    const theatre = await Theatre.findById(id, { name: 1, movies: 1, address: 1 }).populate("movies");

    if (!theatre) {
      throw {
        err: "No theatre with the given id found",
        code: StatusCodes.NOT_FOUND,
      };
    }

    return theatre;
  } catch (error) {
    console.error(error);
    throw {
      err: "Internal server error",
      code: StatusCodes.INTERNAL_SERVER_ERROR,
    };
  }
};

/**
 * Check if a movie exists in a theatre
 *
 * @param theatreId --> Theatre ID
 * @param movieId --> Movie ID
 * @returns --> Returns true if movie exists, false otherwise
 */
const checkMovieInATheatre = async (theatreId, movieId) => {
  try {
    let response = await Theatre.findById(theatreId);
    if (!response) {
      throw {
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
