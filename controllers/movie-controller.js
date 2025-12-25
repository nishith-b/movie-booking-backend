const Movie = require("../models/movie");
const MovieService = require("../services/movie-service");

const ErrorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong, cannot process the request",
  success: false,
};

const SuccessResponseBody = {
  err: {},
  data: {},
  message: "Successfully Processed Request",
  success: true,
};

/**
 * Controller function to create a new movie
 * @route POST /movies
 * @returns {Object} movie created
 */
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);

    return res.status(201).json({
      success: true,
      error: {},
      data: movie,
      message: "Successfully created a new movie",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: { message: error.message },
      data: {},
      message: "Something went wrong while creating the movie",
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const deletedMovie = await Movie.findByIdAndDelete(movieId);

    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        error: {},
        data: {},
        message: "Movie not found",
      });
    }

    return res.status(200).json({
      success: true,
      error: {},
      data: deletedMovie,
      message: "Movie deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: { message: error.message },
      data: {},
      message: "Something went wrong while deleting the movie",
    });
  }
};

const getMovie = async (req, res) => {
  try {
    const response = await MovieService.getMovieById(req.params.id);
    if (response.error) {
      ErrorResponseBody.err = response.error;
      return res.status(response.code).json(ErrorResponseBody);
    }
    SuccessResponseBody.data = response;
    return res.status(200).json(SuccessResponseBody);
  } catch (error) {
    console.log(error);
    return res.status(500).json(ErrorResponseBody);
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
};
