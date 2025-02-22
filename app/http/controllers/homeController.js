const Menu = require("../../models/menu.js");
function HomeController() {
  return {
    async index(req, res) {
      // console.log(req.session);
      // Menu.find().then(function (pizzas) {
      //   return res.render("home", { pizzas: pizzas });
      // });
      const pizzas = await Menu.find();
      return res.render("home", { pizzas: pizzas });
    },
  };
}

module.exports = HomeController;
