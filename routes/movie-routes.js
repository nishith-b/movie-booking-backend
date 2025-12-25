const movieController = require("../controllers/movie-controller");
const movieMiddlewares = require("../middlewares/movie-middleware");

const routes = (app) => {
  app.post(
    "/mba/api/v1/movies",
    movieMiddlewares.validateCreateMovieRequest,
    movieController.createMovie
  );

  app.delete("/mba/api/v1/movies/:movieId", movieController.deleteMovie);

  app.get("/mba/api/v1/movies/:id", movieController.getMovie);
};

module.exports = routes;
