// Middleware to check user role
// 404 Middleware
function notFoundAction(req, res, next) {
  res.status(404).render('errors/404', {
    pageTitle: "Page Not Found",
    style: "/errors/404/index.css",
    script: "/errors/404/index.js",
    layout:"error",
    message: "The page you are looking for does not exist."
  });
}

module.exports = {
  notFoundAction,
};
