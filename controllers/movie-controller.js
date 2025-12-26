const MovieService = require("../services/movie-service");
const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");
/**
 * Controller function to create a new movie
 * @route POST /movies
 * @returns {Object} movie created
 */
const createMovie = async (req, res) => {
  try {
    const response = await MovieService.createMovie(req.body);
    // Error Caused by Frontend Request
    if (response.err) {
      ErrorResponseBody.err = response.err;
      ErrorResponseBody.message =
        "Validation Failed on Few Parameters of The Request Body";
      return res.status(response.code).json(ErrorResponseBody);
    }
    SuccessResponseBody.data = movie;
    return res.status(201).json(SuccessResponseBody);
  } catch (error) {
    // Handles Backend Errors
    console.log(error);
    ErrorResponseBody.err = error;
    return res.status(500).json(ErrorResponseBody);
  }
};

const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;

    const response = await MovieService.deleteMovie(movieId);

    if (response.error) {
      ErrorResponseBody.err = response.error;
      return res.status(response.code).json(ErrorResponseBody);
    }

    SuccessResponseBody.data = response;
    return res.status(200).json(SuccessResponseBody);
  } catch (error) {
    console.log(error);
    ErrorResponseBody.message = "Something went wrong while deleting the movie";
    ErrorResponseBody.err = error;
    return res.status(500).json(ErrorResponseBody);
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
    ErrorResponseBody.message = "Something went wrong while geting the movie";
    return res.status(500).json(ErrorResponseBody);
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
};
