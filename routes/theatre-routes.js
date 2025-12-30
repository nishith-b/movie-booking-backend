const theatreController = require("../controllers/theatre-controller");
const theatreMiddleware = require("../middlewares/theatre-middleware");

/**
 * Theatre Routes
 * @param app - Express app instance
 * Defines all API routes for Theatre resource
 */
const routes = (app) => {
  // CREATE a new theatre
  // Endpoint: POST /mba/api/v1/theatres
  // Middleware: validateTheatreCreateRequest
  // Controller: create
  app.post(
    "/mba/api/v1/theatres",
    theatreMiddleware.validateTheatreCreateRequest,
    theatreController.create
  );

  // READ all theatres with optional query parameters (filtering/pagination)
  // Endpoint: GET /mba/api/v1/theatres
  app.get("/mba/api/v1/theatres", theatreController.getTheatres);

  // READ a theatre by ID
  // Endpoint: GET /mba/api/v1/theatres/:id
  app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);

  // DELETE a theatre by ID
  // Endpoint: DELETE /mba/api/v1/theatres/:id
  app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);

  // UPDATE a theatre by ID (Partial update using PATCH)
  // Endpoint: PATCH /mba/api/v1/theatres/:id
  app.patch("/mba/api/v1/theatres/:id", theatreController.updateTheatre);

  // UPDATE a theatre by ID (Full update using PUT)
  // Endpoint: PUT /mba/api/v1/theatres/:id
  app.put("/mba/api/v1/theatres/:id", theatreController.updateTheatre);

  app.patch(
    "/mba/api/v1/theatres/:id/movies",
    theatreMiddleware.validateUpdateMoviesRequest,
    theatreController.updateMovies
  );

  app.get("/mba/api/v1/theatres/:id/movies", theatreController.getMovies);

  app.get(
    "/mba/api/v1/theatres/:theatreId/movies/:movieId",
    theatreController.checkMovie
  );
};

module.exports = routes;
