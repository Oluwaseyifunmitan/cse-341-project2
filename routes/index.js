const passport = require("passport");

const routes = require("express").Router();

routes.use("/", require("./swagger"));

routes.use("/employees", require("./employees"));
routes.use("/inventory", require("./inventory"));
routes.get(
  "/login",
  passport.authenticate("github", (req, res) => {}),
);
routes.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
module.exports = routes;
