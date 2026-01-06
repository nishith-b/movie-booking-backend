const { StatusCodes } = require("http-status-codes");
const showService = require("../services/show-service");
const {
  ErrorResponseBody,
  SuccessResponseBody,
} = require("../utils/response-body");

const create = async (req, res) => {
  try {
    const response = await showService.createShow(req.body);
    SuccessResponseBody.message = "Successfully created the show";
    SuccessResponseBody.data = response;
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

module.exports = { create };
