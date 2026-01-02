const movieController = require("../controllers/movie-controller");
const movieMiddlewares = require("../middlewares/movie-middleware");
const authMiddlewares = require("../middlewares/auth-middleware");

/**
 * Movie Routes
 * @param app - Express app instance
 * Defines all API routes for Movie resource
 */
const routes = (app) => {
  // CREATE a new movie
  // Endpoint: POST /mba/api/v1/movies
  // Middleware: validate request body
  // Controller: createMovie
  app.post(
    "/mba/api/v1/movies",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieMiddlewares.validateCreateMovieRequest,
    movieController.createMovie
  );

  // DELETE a movie by ID
  // Endpoint: DELETE /mba/api/v1/movies/:movieId
  app.delete(
    "/mba/api/v1/movies/:movieId",
    authMiddlewares.isAuthenticated,
    authMiddlewares.isAdminOrClient,
    movieController.deleteMovie
  );

  // READ a movie by ID
  // Endpoint: GET /mba/api/v1/movies/:id
  app.get("/mba/api/v1/movies/:id", movieController.getMovie);

  // UPDATE a movie by ID (Full update using PUT)
  // Endpoint: PUT /mba/api/v1/movies/:id
  app.put("/mba/api/v1/movies/:id", movieController.updateMovie);

  // UPDATE a movie by ID (Partial update using PATCH)
  // Endpoint: PATCH /mba/api/v1/movies/:id
  app.patch("/mba/api/v1/movies/:id", movieController.updateMovie);

  // READ all movies with optional query parameters (filtering/pagination)
  // Endpoint: GET /mba/api/v1/movies
  app.get("/mba/api/v1/movies", movieController.getMovies);
};

module.exports = routes;
