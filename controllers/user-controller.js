const UserService = require("../services/user-service");

const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");

const update = async (req, res) => {
  try {
    const response = await UserService.updateUserRoleOrStatus(
      req.body,
      req.params.id
    );

    // remove password before sending response(security concerns)
    const userResponse = response.toObject();
    delete userResponse.password;

    SuccessResponseBody.data = userResponse;
    SuccessResponseBody.message = "Successfully updated the user";
    return res.status(200).json(SuccessResponseBody);
  } catch (error) {
    if (error.err) {
      ErrorResponseBody.err = error.err;
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res.status(500).json(ErrorResponseBody);
  }
};

module.exports = { update };
