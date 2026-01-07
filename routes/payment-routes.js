const paymentController = require("../controllers/payment-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const paymentMiddleware = require("../middlewares/payment-middleware");

const routes = (app) => {
  app.post(
    "/mba/api/v1/payments",
    authMiddleware.isAuthenticated,
    paymentMiddleware.verifyPaymentCreateRequest,
    paymentController.createPayment
  );

  app.get(
    "/mba/api/v1/payments/all",
    authMiddleware.isAuthenticated,
    paymentController.getAllPayments
  );

  app.get(
    "/mba/api/v1/payments/:id",
    authMiddleware.isAuthenticated,
    paymentController.getPaymentsDetailsById
  );
};

module.exports = routes;
