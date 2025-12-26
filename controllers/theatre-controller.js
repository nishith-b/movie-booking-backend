const TheatreService = require("../services/theatre-service");
const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");

const create = async (req, res) => {
  try {
    const response = await TheatreService.createTheatre(req.body);
    if (response.err) {
      ErrorResponseBody.err = response.error;
      ErrorResponseBody.message =
        "Validation Failed on few parametrs of the request body";
      return res.status(response.code).json(ErrorResponseBody);
    }
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully created the theatre";
    return res.status(201).json(SuccessResponseBody);
  } catch (error) {
    ErrorResponseBody.err = error;
    return res.status(500).json(ErrorResponseBody);
  }
};

const getTheatre = async (req, res) => {
  try {
    const response = await TheatreService.getTheatre(req.params.id);
    if (response.error) {
      ErrorResponseBody.err = response.error;
      return res.status(response.code).json(ErrorResponseBody);
    }
    SuccessResponseBody.data = response;
    SuccessResponseBody.message =
      "Successfully fetched the data of the theatre";
    return res.status(200).json(SuccessResponseBody);
  } catch (error) {
    ErrorResponseBody.err = error;
    return res.status(500).json(ErrorResponseBody);
  }
};

const getTheatres = async (req, res) => {
  try {
    const response = await TheatreService.getAllTheatres(req.query);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully fetched all the theatres";
    return res.status(200).json(SuccessResponseBody);
  } catch (error) {
    ErrorResponseBody.err = error;
    return res.status(500).json(ErrorResponseBody);
  }
};

const deleteTheatre = async (req, res) => {
  try {
    const response = await TheatreService.deleteTheatre(req.params.id);
    if (response.error) {
      ErrorResponseBody.err = response.error;
      return res.status(response.code).json(ErrorResponseBody);
    }
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully deleted the given theatre";
    return res.status(200).json(SuccessResponseBody);
  } catch (error) {
    ErrorResponseBody.err = error;
    return res.status(500).json(ErrorResponseBody);
  }
};

module.exports = { create, getTheatre, getTheatres, deleteTheatre };
