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

  app.get("/mba/api/v1/shows", showController.getShows);

  app.delete(
    "/mba/api/v1/shows",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    showController.deleteShow
  );

  app.patch(
    "/mba/api/v1/show/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    showMiddleware.validateShowUpdateRequest,
    showController.updateShow
  );
};

module.exports = routes;
