const UserService = require("../services/user-service");
const jwt = require("jsonwebtoken");

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

module.exports = { signup, signin };
