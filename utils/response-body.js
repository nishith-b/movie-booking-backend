/**
 * Template object for building error responses
 */
const ErrorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong, cannot process the request",
  success: false,
};

/**
 * Template object for building success responses
 */
const SuccessResponseBody = {
  err: {},
  data: {},
  message: "Successfully processed request",
  success: true,
};

module.exports = { SuccessResponseBody, ErrorResponseBody };
