const { StatusCodes } = require("http-status-codes");
const TheatreService = require("../services/theatre-service");
const sendMail = require("../services/email-service");
const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");

/**
 * Create a new theatre
 *
 * @param req --> HTTP request object containing theatre details in request body
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns the created theatre or validation / error response
 */
const create = async (req, res) => {
  try {
    const response = await TheatreService.createTheatre({
      ...req.body,
      owner: req.user,
    });
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully created the theatre";
    sendMail(
      "Successfully created a theatre",
      response.userId,
      "You have successfully created a new theatre"
    );
    return res.status(StatusCodes.CREATED).json(SuccessResponseBody);
  } catch (error) {
    //console.error(error);
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
 *
 * @param req --> HTTP request object containing theatre ID in route params
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns theatre details or error response
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
 * Get all theatres
 *
 * @param req --> HTTP request object containing optional query params
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns list of theatres or error response
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
 *
 * @param req --> HTTP request object containing theatre ID in route params
 * @param res --> HTTP response object to be returned
 *
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
 *
 * @param req --> HTTP request object containing theatre ID in params and update data in body
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns updated theatre or validation / error response
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
    console.error(error);
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

/**
 * Add or remove movies in a theatre
 *
 * @param req --> HTTP request object containing theatre ID in params and movieIds + insert flag in body
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns updated theatre-movie mapping or error response
 */
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

/**
 * Get all movies running in a specific theatre
 *
 * @param req --> HTTP request object containing theatre ID in route params
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns list of movies in the theatre or error response
 */
const getMovies = async (req, res) => {
  try {
    const response = await TheatreService.getMoviesInATheatre(req.params.id);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message =
      "Successfully fetched the movies for the theatre";
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

/**
 * Check if a movie is running in a specific theatre
 *
 * @param req --> HTTP request object containing theatreId and movieId in route params
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns boolean/status indicating movie presence or error response
 */
const checkMovie = async (req, res) => {
  try {
    const { theatreId, movieId } = req.params;
    const response = await TheatreService.checkMovieInATheatre(
      theatreId,
      movieId
    );
    SuccessResponseBody.data = response;
    SuccessResponseBody.message =
      "Successfully checked if movie is present in the theatre";
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
