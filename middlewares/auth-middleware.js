const { ErrorResponseBody } = require("../utils/response-body");

const validateSignupRequest = async (req, res, next) => {
  // validate name of the user
  if (!req.body.name) {
    ErrorResponseBody.err = "Name of the user not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  // validate email of the user
  if (!req.body.email) {
    ErrorResponseBody.err = "Email of the user not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  // validate password present of the user
  if (!req.body.password) {
    ErrorResponseBody.err = "Password of the user not present in the request";
    return res.status(400).json(ErrorResponseBody);
  }

  next();
};

module.exports = {
  validateSignupRequest,
};
