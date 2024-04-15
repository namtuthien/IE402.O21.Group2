const tourRouter = require('./tour.route');

const authRouter = require('./auth.route');

const siteRouter = require('./site.route');

const locationRouter = require('./location.route');

const route = (app) => {
    app.use('/tour', tourRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);
    app.use('/location', locationRouter);
};

module.exports = route;
