const userController = require("../controllers/user-controller");
const userMiddleware = require("../middlewares/user-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

/**
 * User Routes
 *
 * @param app --> Express application instance
 *
 * Defines API routes related to user management,
 * including updating user role or status (admin-only).
 */
const routes = (app) => {
  /**
   * UPDATE a user's role or status by ID
   *
   * Endpoint: PATCH /mba/api/v1/user/:id
   * Access: Authenticated Admin only
   * Middleware:
   *  - validateUpdateUserRequest: ensures at least one field to update
   *  - isAuthenticated: checks JWT token
   *  - isAdmin: ensures user has admin role
   * Controller: update
   */
  app.patch(
    "/mba/api/v1/user/:id",
    userMiddleware.validateUpdateUserRequest,
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    userController.update
  );
};

module.exports = routes;
