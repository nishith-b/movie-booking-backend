const ErrorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong, cannot process the request",
  success: false,
};

const SuccessResponseBody = {
  err: {},
  data: {},
  message: "Successfully Processed Request",
  success: true,
};

module.exports = { SuccessResponseBody, ErrorResponseBody };
