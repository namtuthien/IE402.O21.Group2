// Middleware to check user role
function forbiddenAction(requiredRole) {
  return (req, res, next) => {
    if (!req.user_role || !requiredRole.includes(req.user_role)) {
      return res.status(403).render('errors/403', {
        pageTitle: "Page Not Found",
        style: "/errors/403/index.css",
        script: "/errors/403/index.js",
        layout:"error",
        message: "You don't have permission. Contact admin for access."
      });
    }

    next();
  };
}

module.exports = {
  forbiddenAction,
};
