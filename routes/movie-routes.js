const MovieController = require("../controllers/movie-controller");
const MovieMiddlewares = require("../middlewares/movie-middleware");

const routes = (app) => {
  app.post(
    "/mba/api/v1/movies",
    MovieMiddlewares.validateCreateMovieRequest,
    MovieController.createMovie
  );

  app.delete("/mba/api/v1/movies/:movieId", MovieController.deleteMovie);
};

module.exports = routes;
