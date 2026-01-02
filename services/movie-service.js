const { StatusCodes } = require("http-status-codes");
const Movie = require("../models/movie");

/**
 * Get a movie by its ID
 *
 * @param id --> Movie ID
 * @returns --> Returns the movie object
 */
const getMovieById = async (id) => {
  const movie = await Movie.findById(id);

  if (!movie) {
    throw {
      error: "No movie found for the corresponding id provided",
      code: StatusCodes.NOT_FOUND,
    };
  }

  return movie;
};

/**
 * Create a new movie
 *
 * @param data --> Object containing details of the new movie
 * @returns --> Returns the created movie object
 */
const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.error(err);
      throw { err: err, code: StatusCodes.UNPROCESSABLE_ENTITY };
    } else {
      throw new error();
    }
  }
};

/**
 * Delete a movie by its ID
 *
 * @param id --> Movie ID
 * @returns --> Returns the deleted movie object
 */
const deleteMovie = async (id) => {
  try {
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      throw {
        error: "No movie record found for the id provided",
        code: StatusCodes.NOT_FOUND,
      };
    }
    return movie;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/**
 * Update a movie by its ID
 *
 * @param id --> Movie ID
 * @param data --> Object containing fields to update
 * @returns --> Returns the updated movie object
 */
const updateMovie = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return movie;
  } catch (error) {
    if (error.name == "ValidationError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.error(err);
      throw { err: err, code: StatusCodes.UNPROCESSABLE_ENTITY };
    } else {
      throw new error();
    }
  }
};

/**
 * Fetch movies based on a filter
 *
 * @param filter --> Object containing filter conditions (e.g., { name: "abc" })
 * @returns --> Returns an array of movies matching the filter
 */
const fetchMovies = async (filter) => {
  let query = {};
  if (filter.name) query.name = filter.name;

  let movies = await Movie.find(query);

  if (!movies) {
    throw {
      err: "Not able to find the queried movies",
      code: StatusCodes.NOT_FOUND,
    };
  }
  return movies;
};

module.exports = {
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
  fetchMovies,
};
