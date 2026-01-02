const authController = require("../controllers/auth-controller");
const authMiddleware = require("../middlewares/auth-middleware");

/**
 * Auth Routes
 *
 * @param app --> Express application instance
 *
 * Defines all API routes related to authentication,
 * including signup, signin, and password reset.
 */
const routes = (app) => {
  /**
   * USER SIGNUP
   *
   * Endpoint: POST /mba/api/v1/auth/signup
   * Middleware:
   *  - validateSignupRequest: ensures name, email, and password are provided
   * Controller: signup
   */
  app.post(
    "/mba/api/v1/auth/signup",
    authMiddleware.validateSignupRequest,
    authController.signup
  );

  /**
   * USER SIGNIN
   *
   * Endpoint: POST /mba/api/v1/auth/signin
   * Middleware:
   *  - validateSigninRequest: ensures email and password are provided
   * Controller: signin
   */
  app.post(
    "/mba/api/v1/auth/signin",
    authMiddleware.validateSigninRequest,
    authController.signin
  );

  /**
   * PASSWORD RESET
   *
   * Endpoint: PATCH /mba/api/v1/auth/reset
   * Access: Authenticated users only
   * Middleware:
   *  - isAuthenticated: ensures valid JWT token
   *  - validateResetPasswordRequest: ensures oldPassword and newPassword are provided
   * Controller: resetPassword
   */
  app.patch(
    "/mba/api/v1/auth/reset",
    authMiddleware.isAuthenticated,
    authMiddleware.validateResetPasswordRequest,
    authController.resetPassword
  );
};

module.exports = routes;
