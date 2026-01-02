const { StatusCodes } = require("http-status-codes");
const MovieService = require("../services/movie-service");

const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");

/**
 * Create a new movie
 * @param req --> HTTP request object containing movie details
 * @param res --> HTTP response object to be returned
 * @returns --> Returns the created movie or validation/error response
 */
const createMovie = async (req, res) => {
  try {
    const response = await MovieService.createMovie(req.body);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully created the movie";
    return res.status(StatusCodes.CREATED).json(SuccessResponseBody);
  } catch (error) {
    if (error.err) {
      ErrorResponseBody.err = error.err;
      ErrorResponseBody.message =
        "Validation Failed on Few Parameters of The Request Body";
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

/**
 * Delete a movie by ID
 * @param req --> HTTP request object containing movieId as param
 * @param res --> HTTP response object to be returned
 * @returns --> Returns success message or error response
 */
const deleteMovie = async (req, res) => {
  try {
    const { movieId } = req.params;
    const response = await MovieService.deleteMovie(movieId);
    SuccessResponseBody.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.error) {
      ErrorResponseBody.err = error.error;
      return res.status(error.code).json(ErrorResponseBody);
    }
    console.log(error);
    ErrorResponseBody.message = "Something went wrong while deleting the movie";
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

/**
 * Get a movie by ID
 * @param req --> HTTP request object containing movie ID as param
 * @param res --> HTTP response object to be returned
 * @returns --> Returns the movie details or error response
 */
const getMovie = async (req, res) => {
  try {
    const response = await MovieService.getMovieById(req.params.id);
    SuccessResponseBody.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.error) {
      ErrorResponseBody.err = error.error;
      return res.status(error.code).json(ErrorResponseBody);
    }
    console.log(error);
    ErrorResponseBody.message = "Something went wrong while getting the movie";
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

/**
 * Update a movie by ID
 * @param req --> HTTP request object containing movie ID as param and update body
 * @param res --> HTTP response object to be returned
 * @returns --> Returns the updated movie or validation/error response
 */
const updateMovie = async (req, res) => {
  try {
    const response = await MovieService.updateMovie(req.params.id, req.body);
    SuccessResponseBody.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.err) {
      ErrorResponseBody.err = error.err;
      ErrorResponseBody.message =
        "The updates that we are trying to apply don't validate the schema";
      return res.status(error.code).json(ErrorResponseBody);
    }
    console.log(error);
    ErrorResponseBody.err = error;
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponseBody);
  }
};

/**
 * Get all movies
 * @param req --> HTTP request object containing optional query parameters for filtering/pagination
 * @param res --> HTTP response object to be returned
 * @returns --> Returns the list of movies or error response
 */
const getMovies = async (req, res) => {
  try {
    const response = await MovieService.fetchMovies(req.query);
    SuccessResponseBody.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.err) {
      ErrorResponseBody.err = error.err;
      return res.status(error.code).json(ErrorResponseBody);
    }
    console.error(error);
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

module.exports = {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
  getMovies,
};
