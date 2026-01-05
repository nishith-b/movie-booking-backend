const theatreController = require("../controllers/theatre-controller");
const theatreMiddleware = require("../middlewares/theatre-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

/**
 * Theatre Routes
 *
 * @param app --> Express application instance
 *
 * Defines all API routes related to theatre management,
 * including creation, retrieval, updates, deletion,
 * and movie mappings for theatres.
 */
const routes = (app) => {
  /**
   * CREATE a new theatre
   *
   * Endpoint: POST /mba/api/v1/theatres
   * Access: Authenticated Admin or Client
   * Middleware:
   *  - isAuthenticated
   *  - isAdminOrClient
   *  - validateTheatreCreateRequest
   */
  app.post(
    "/mba/api/v1/theatres",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreMiddleware.validateTheatreCreateRequest,
    theatreController.create
  );

  /**
   * READ all theatres
   *
   * Endpoint: GET /mba/api/v1/theatres
   * Access: Public
   * Supports optional query params for filtering / pagination
   */
  app.get("/mba/api/v1/theatres", theatreController.getTheatres);

  /**
   * READ a theatre by ID
   *
   * Endpoint: GET /mba/api/v1/theatres/:id
   * Access: Public
   */
  app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);

  /**
   * DELETE a theatre by ID
   *
   * Endpoint: DELETE /mba/api/v1/theatres/:id
   * Access: Authenticated Admin or Client
   */
  app.delete(
    "/mba/api/v1/theatres/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreController.deleteTheatre
  );

  /**
   * UPDATE a theatre by ID (Partial update)
   *
   * Endpoint: PATCH /mba/api/v1/theatres/:id
   * Access: Authenticated Admin or Client
   */
  app.patch(
    "/mba/api/v1/theatres/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreController.updateTheatre
  );

  /**
   * UPDATE a theatre by ID (Full update)
   *
   * Endpoint: PUT /mba/api/v1/theatres/:id
   * Access: Authenticated Admin or Client
   */
  app.put(
    "/mba/api/v1/theatres/:id",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreController.updateTheatre
  );

  /**
   * UPDATE movies running in a theatre
   *
   * Endpoint: PATCH /mba/api/v1/theatres/:id/movies
   * Access: Not restricted here (handled at controller/service level if needed)
   * Middleware:
   *  - validateUpdateMoviesRequest
   */
  app.patch(
    "/mba/api/v1/theatres/:id/movies",
    authMiddleware.isAuthenticated,
    authMiddleware.isAdminOrClient,
    theatreMiddleware.validateUpdateMoviesRequest,
    theatreController.updateMovies
  );

  /**
   * READ all movies running in a theatre
   *
   * Endpoint: GET /mba/api/v1/theatres/:id/movies
   * Access: Public
   */
  app.get("/mba/api/v1/theatres/:id/movies", theatreController.getMovies);

  /**
   * CHECK if a movie is running in a specific theatre
   *
   * Endpoint: GET /mba/api/v1/theatres/:theatreId/movies/:movieId
   * Access: Public
   */
  app.get(
    "/mba/api/v1/theatres/:theatreId/movies/:movieId",
    theatreController.checkMovie
  );
};

module.exports = routes;
