const { StatusCodes } = require("http-status-codes");
const TheatreService = require("../services/theatre-service");
const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");

/**
 * Create a new theatre
 * @param req --> HTTP request object containing theatre details in body
 * @param res --> HTTP response object to be returned
 * @returns --> Returns the created theatre or validation/error response
 */
const create = async (req, res) => {
  try {
    const response = await TheatreService.createTheatre(req.body);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully created the theatre";
    return res.status(StatusCodes.CREATED).json(SuccessResponseBody);
  } catch (error) {
    if (error.err) {
      ErrorResponseBody.err = error.err;
      ErrorResponseBody.message =
        "Validation Failed on few parameters of the request body";
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

/**
 * Get a theatre by ID
 * @param req --> HTTP request object containing theatre ID as param
 * @param res --> HTTP response object to be returned
 * @returns --> Returns the theatre details or error response
 */
const getTheatre = async (req, res) => {
  try {
    const response = await TheatreService.getTheatre(req.params.id);

    SuccessResponseBody.data = response;
    SuccessResponseBody.message =
      "Successfully fetched the data of the theatre";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.error) {
      ErrorResponseBody.err = error.error;
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

/**
 * Get all theatres (with optional query parameters for filtering/pagination)
 * @param req --> HTTP request object containing query parameters
 * @param res --> HTTP response object to be returned
 * @returns --> Returns the list of theatres or error response
 */
const getTheatres = async (req, res) => {
  try {
    const response = await TheatreService.getAllTheatres(req.query);
    SuccessResponseBody.message = "Successfully fetched all the theatres";
    SuccessResponseBody.data = response;
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.error) {
      ErrorResponseBody.err = error.error;
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

/**
 * Delete a theatre by ID
 * @param req --> HTTP request object containing theatre ID as param
 * @param res --> HTTP response object to be returned
 * @returns --> Returns success message or error response
 */
const deleteTheatre = async (req, res) => {
  try {
    const response = await TheatreService.deleteTheatre(req.params.id);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully deleted the given theatre";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.error) {
      ErrorResponseBody.err = error.error;
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

/**
 * Update a theatre by ID
 * @param req --> HTTP request object containing theatre ID as param and update body
 * @param res --> HTTP response object to be returned
 * @returns --> Returns the updated theatre or validation/error response
 */
const updateTheatre = async (req, res) => {
  try {
    const response = await TheatreService.updateTheatre(
      req.params.id,
      req.body
    );
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully updated the theatre";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.error) {
      ErrorResponseBody.err = error.error;
      return res.status(error.code).json(ErrorResponseBody);
    }
    console.log(error);
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

const updateMovies = async (req, res) => {
  try {
    const response = await TheatreService.updateMoviesInTheatres(
      req.params.id,
      req.body.movieIds,
      req.body.insert
    );
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully updated movies in the theatre";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.err) {
      ErrorResponseBody.err = error.err;
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

const getMovies = async (req, res) => {
  try {
    const response = await TheatreService.getMoviesInATheatre(req.params.id);
    if (response.err) {
      ErrorResponseBody.err = response.err;
      return res.status(response.code).json(ErrorResponseBody);
    }
    SuccessResponseBody.data = response;
    SuccessResponseBody.message =
      "Successfully fetched the movies for the theatre";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

const checkMovie = async (req, res) => {
  try {
    const { theatreId, movieId } = req.params;
    const response = await TheatreService.checkMovieInATheatre(
      theatreId,
      movieId
    );
    if (response.err) {
      ErrorResponseBody.err = response.err;
      return res.status(response.code).json(ErrorResponseBody);
    }
    SuccessResponseBody.data = response;
    SuccessResponseBody.message =
      "Successfully checked if movie is present in the theatre";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};
module.exports = {
  create,
  getTheatre,
  getTheatres,
  getMovies,
  deleteTheatre,
  updateTheatre,
  updateMovies,
  checkMovie,
};
