const UserService = require("../services/user-service");
const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");

const signup = async (req, res) => {
  try {
    const response = await UserService.createUser(req.body);
    SuccessResponseBody.data = response;
    SuccessResponseBody.message = "Successfully Registered a user";
    return res.status(201).json(SuccessResponseBody);
  } catch (error) {
    if (error.err) {
      ErrorResponseBody.err = error.err;
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res.status(500).json(ErrorResponseBody);
  }
};

module.exports = { signup };
