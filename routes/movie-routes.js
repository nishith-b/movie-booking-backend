const movieController = require("../controllers/movie-controller");
const movieMiddlewares = require("../middlewares/movie-middleware");
const authMiddlewares = require("../middlewares/auth-middleware");

/**
 * Movie Routes
 *
 * @param app --> Express application instance
 *
 * Defines all API routes related to movie management,
 * including creation, retrieval, updates, and deletion.
 */
const routes = (app) => {
  /**
   * CREATE a new movie
   *
   * Endpoint: POST /mba/api/v1/movies
   * Access: Authenticated Admin or Client
   * Middleware:
   *  - isAuthenticated
   *  - isAdminOrClient
   *  - validateCreateMovieRequest
   * Controller: createMovie
   */
  app.post(
    "/mba/api/v1/movies",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieMiddlewares.validateCreateMovieRequest,
    movieController.createMovie
  );

  /**
   * DELETE a movie by ID
   *
   * Endpoint: DELETE /mba/api/v1/movies/:movieId
   * Access: Authenticated Admin or Client
   */
  app.delete(
    "/mba/api/v1/movies/:movieId",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieController.deleteMovie
  );

  /**
   * READ a movie by ID
   *
   * Endpoint: GET /mba/api/v1/movies/:id
   * Access: Public
   */
  app.get("/mba/api/v1/movies/:id", movieController.getMovie);

  /**
   * UPDATE a movie by ID (Full update using PUT)
   *
   * Endpoint: PUT /mba/api/v1/movies/:id
   * Access: Authenticated Admin or Client
   */
  app.put(
    "/mba/api/v1/movies/:id",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieController.updateMovie
  );

  /**
   * UPDATE a movie by ID (Partial update using PATCH)
   *
   * Endpoint: PATCH /mba/api/v1/movies/:id
   * Access: Authenticated Admin or Client
   */
  app.patch(
    "/mba/api/v1/movies/:id",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieController.updateMovie
  );

  /**
   * READ all movies
   *
   * Endpoint: GET /mba/api/v1/movies
   * Access: Public
   * Supports optional query parameters for filtering / pagination
   */
  app.get("/mba/api/v1/movies", movieController.getMovies);
};

module.exports = routes;
