const { StatusCodes } = require("http-status-codes");
const Movie = require("../models/movie");

/**
 *
 * @param id --> id which will be used to identify the movie to be fetched
 * @returns --> object containing movie fetched
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
 *
 * @param data --> object containing deatils of the new movie to be created
 * @returns --> returns the new movie object created
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
      console.log(err);
      throw { err: err, code: StatusCodes.UNPROCESSABLE_ENTITY };
    } else {
      throw new error();
    }
  }
};

/**
 *
 * @param id --> id which will be used to identify the movie to be deleted
 * @returns --> object containing details of the movie deleted
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
    console.log(error);
    throw error;
  }
};

/**
 *
 * @param id --> id which will be used to identify the mivue to be updated
 * @param data --> object that contains actial data which is to be updated in the db
 * @returns --> returns new updated movie object
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
      console.log(err);
      throw { err: err, code: StatusCodes.UNPROCESSABLE_ENTITY };
    } else {
      throw new error();
    }
  }
};

/**
 *
 * @param  filter --> filter helps in filtering out data based on the conditions
 * @returns --> returns an object containing all the movie fetched based on the filter
 */
const fetchMovies = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = filter.name;
  }
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
