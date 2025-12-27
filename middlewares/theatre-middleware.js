const { ErrorResponseBody } = require("../utils/response-body");

const validateTheatreCreateRequest = async (req, res, next) => {
  // validate the presence of name
  if (!req.body.name) {
    ErrorResponseBody.message =
      "The name of the theatre is not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  // validate for the presence of pincode
  if (!req.body.pincode) {
    ErrorResponseBody.message =
      "The pincode of the theatre is not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  //validation for presence of city
  if (!req.body.city) {
    ErrorResponseBody.message =
      "The city of the theatre is not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  next();
};

module.exports = { validateTheatreCreateRequest };
