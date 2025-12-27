const theatreController = require("../controllers/theatre-controller");
const theatreMiddleware = require("../middlewares/theatre-middleware");

const routes = (app) => {
  app.post(
    "/mba/api/v1/theatres",
    theatreMiddleware.validateTheatreCreateRequest,
    theatreController.create
  );

  app.get("/mba/api/v1/theatres", theatreController.getTheatres);

  app.get("/mba/api/v1/theatres/:id", theatreController.getTheatre);

  app.delete("/mba/api/v1/theatres/:id", theatreController.deleteTheatre);

  app.patch("/mba/api/v1/theatres/:id", theatreController.updateTheatre);

  app.put("/mba/api/v1/theatres/:id", theatreController.updateTheatre);
};

module.exports = routes;
