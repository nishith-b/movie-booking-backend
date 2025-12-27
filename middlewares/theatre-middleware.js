const { ErrorResponseBody } = require("../utils/response-body");

/**
 *
 * @param req --> HTTP request object
 * @param res --> HTTP response object
 * @param next --> next middleware function
 * @returns --> whether the request is valid or not
 */

const validateTheatreCreateRequest = async (req, res, next) => {
  if (!req.body.name) {
    ErrorResponseBody.message =
      "The name of the theatre is not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  if (!req.body.pincode) {
    ErrorResponseBody.message =
      "The pincode of the theatre is not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  if (!req.body.city) {
    ErrorResponseBody.message =
      "The city of the theatre is not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  next();
};

module.exports = { validateTheatreCreateRequest };
