/**
 * This object will be used as a template for building error responses
 */

const ErrorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong, cannot process the request",
  success: false,
};

/**
 * This object will be used as a template for building success response
 */
const SuccessResponseBody = {
  err: {},
  data: {},
  message: "Successfully Processed Request",
  success: true,
};

module.exports = { SuccessResponseBody, ErrorResponseBody };
