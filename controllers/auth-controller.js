const UserService = require("../services/user-service");
const jwt = require("jsonwebtoken");

const {
  SuccessResponseBody,
  ErrorResponseBody,
} = require("../utils/response-body");

/**
 * Register a new user
 *
 * @param req --> HTTP request object containing user details in request body
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns created user details or validation / error response
 */
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

/**
 * Login a user and generate JWT token
 *
 * @param req --> HTTP request object containing email and password in request body
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns user details along with authentication token or error response
 */
const signin = async (req, res) => {
  try {
    const user = await UserService.getUserByEmail(req.body.email);
    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      throw { err: "Invalid Password for the given email", code: 401 };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_KEY,
      { expiresIn: "1h" }
    );

    SuccessResponseBody.message = "Successfully Logged In";
    SuccessResponseBody.data = {
      email: user.email,
      userRole: user.userRole,
      status: user.userStatus,
      token: token,
    };
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

/**
 * Reset password for an authenticated user
 *
 * @param req --> HTTP request object containing oldPassword and newPassword in body
 * @param res --> HTTP response object to be returned
 *
 * @returns --> Returns success message and updated user details or error response
 */
const resetPassword = async (req, res) => {
  try {
    const user = await UserService.getUserById(req.user);

    const isOldPasswordCorrect = await user.isValidPassword(
      req.body.oldPassword
    );

    if (!isOldPasswordCorrect) {
      return res.status(403).json({
        err: "Invalid old password, Please provide correct password",
      });
    }

    // update password properly
    user.password = req.body.newPassword;
    await user.save(); // pre("save") will hash it

    // remove password before sending response (security concerns)
    const userResponse = user.toObject();
    delete userResponse.password;

    return res.status(200).json({
      message: "Password updated successfully",
      data: userResponse,
    });
  } catch (error) {
    return res.status(500).json({ err: error });
  }
};

module.exports = { signup, signin, resetPassword };
