const { StatusCodes } = require("http-status-codes");
const { ErrorResponseBody } = require("../utils/response-body");

/**
 * Validate request body for updating user role or status
 *
 * @param req --> HTTP request object containing update data in request body
 * @param res --> HTTP response object to be returned
 * @param next --> Next middleware function
 *
 * @returns --> Calls next middleware if request is valid, otherwise returns error response
 */
const validateUpdateUserRequest = (req, res, next) => {
  // validate presence of at least one of userRole or userStatus
  if (!(req.body.userRole || req.body.userStatus)) {
    ErrorResponseBody.err =
      "Malformed Request, Please send atleast one parameter";
    return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponseBody);
  }
  next();
};

module.exports = {
  validateUpdateUserRequest,
};
