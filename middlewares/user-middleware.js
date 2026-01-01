const { ErrorResponseBody } = require("../utils/response-body");

const validateUpdateUserRequest = (req, res, next) => {
  // validate presence of atleast one of the two ie. userRole or userStatus
  if (!(req.userRole || req.body.userStatus)) {
    ErrorResponseBody.err =
      "Malformed Request, Please send atleast one parameter";
    return res.status(400).json(ErrorResponseBody);
  }
  next();
};
module.exports = {
  validateUpdateUserRequest,
};
