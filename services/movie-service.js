const Movie = require("../models/movie");

const getMovieById = async (id) => {
  const movie = await Movie.findById(id);

  if (!movie) {
    return {
      error: "No movie found for the corresponding id provided",
      code: 404,
    };
  }

  return movie;
};

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
      return { err: err, code: 422 };
    } else {
      throw new error();
    }
  }
};

const deleteMovie = async (id) => {
  const movie = await Movie.deleteOne(id);

  if (!movie) {
    return {
      error: "No movie found for the corresponding id provided",
      code: 404,
    };
  }

  return movie;
};

module.exports = { getMovieById, createMovie, deleteMovie };
