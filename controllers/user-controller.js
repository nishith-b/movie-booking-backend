const { StatusCodes } = require("http-status-codes");
const UserService = require("../services/user-service");

const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");

/**
 * Update a user's role or status
 *
 * @param req --> HTTP request object containing update data in body and user ID in route params
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns updated user details (without password) or error response
 */
const update = async (req, res) => {
  try {
    const response = await UserService.updateUserRoleOrStatus(
      req.body,
      req.params.id
    );

    // remove password before sending response (security concerns)
    const userResponse = response.toObject();
    delete userResponse.password;

    SuccessResponseBody.data = userResponse;
    SuccessResponseBody.message = "Successfully updated the user";
    return res.status(StatusCodes.OK).json(SuccessResponseBody);
  } catch (error) {
    if (error.err) {
      ErrorResponseBody.err = error.err;
      return res.status(error.code).json(ErrorResponseBody);
    }
    ErrorResponseBody.err = error;
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(ErrorResponseBody);
  }
};

module.exports = { update };
