const userController = require("../controllers/user-controller");
const userMiddleware = require("../middlewares/user-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

const routes = (app) => {
  app.patch(
    "/mba/api/v1/user/:id",
    userMiddleware.validateUpdateUserRequest,
    authMiddleware.isAuthenticated,
    authMiddleware.isAdmin,
    userController.update
  );
};

module.exports = routes;
