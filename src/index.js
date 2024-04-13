// import libs
const express = require("express");
const dotenv = require("dotenv");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require("path");

// import configs
const { HOST, PORT, db } = require("./config");

// import routes
const route = require("./routes");

// config .env
dotenv.config();

// run app
const app = express();

// connect to DB
db.connect();

// set view engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
    },
    partialsDir: [
      path.join(__dirname, "resources", "views", "partials"),
      path.join(__dirname, "resources", "views", "components"),
    ],
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

// set static folder
app.use(express.static(path.join(__dirname, "resources", "styles")));
app.use(express.static(path.join(__dirname, "resources", "scripts")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/", express.static("./node_modules/bootstrap/dist/"));

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// use cookie parser
app.use(cookieParser());

// use method override
app.use(methodOverride("_method"));

// import router
route(app);

// start server
app.listen(PORT, () => console.log(`Application is running at: http://${HOST}:${PORT}`));
