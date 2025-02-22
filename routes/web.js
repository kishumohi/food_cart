const AuthController = require("../app/http/controllers/authController.js");
const CartController = require("../app/http/controllers/customers/cartController.js");
const HomeController = require("../app/http/controllers/homeController.js");

function initRoutes(app) {
  app.get("/", HomeController().index);
  app.get("/cart", CartController().index);
  app.get("/login", AuthController().login);
  app.get("/register", AuthController().register);

  app.post("/update-cart", CartController().update);
}

module.exports = initRoutes;
