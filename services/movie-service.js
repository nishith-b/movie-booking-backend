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
  const movie = await Movie.create(data);
  return movie;
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
