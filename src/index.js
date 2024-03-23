const express = require("express");
const path = require("path");
const methodOverride = require("method-override")
const handlebars = require("express-handlebars");
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const route = require("./routes");
const db = require("./config/db");

// Connect to DB
db.connect();

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers:{
      sum:(a,b) => a+b
    }
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources\\views"));

route(app);

app.listen(port, () => console.log("test"));
