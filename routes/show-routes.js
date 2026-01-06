const showController = require("../controllers/show-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const showMiddleware = require("../middlewares/show-middleware");

const routes = (app) => {
  app.post(
    "/mba/api/v1/shows",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    showMiddleware.validateCreateShowRequest,
    showController.create
  );
};

module.exports = routes;
