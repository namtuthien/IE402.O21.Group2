// import libs
const express = require("express");
const dotenv = require("dotenv");
const handlebars = require("express-handlebars");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");

// import configs
const { HOST, PORT, db } = require("./config");

// import routes
const route = require("./routes");

// config .env
dotenv.config();

// run app
const app = express();
const server = http.createServer(app); // Sử dụng HTTP server của Node.js
const io = new Server(server); // Tạo đối tượng Socket.IO server

// connect to DB
db.connect();

// set view engine
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      gt: (a, b) => a > b,
      divide: (a, b) => a / b,
      eq: (a, b) => a === b,
      convertDateToDay: (tour_starting_day) => {
        var timestampStr = tour_starting_day;
        var date = new Date(timestampStr);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var formattedDate = day + "/" + month + "/" + year;
        return formattedDate;
      },
      getIndex: (index) => {
        return parseInt(index) + 1;
      },
      formatPrice: (price) => price.toLocaleString("de-DE"),
      address: (address) =>
        `${address?.street}, ${address?.ward}, ${address?.district}, ${address?.province}`,
      gender: (gender) => (gender ? "Nữ" : "Nam"),
      ifEquals: (arg1, arg2, options) => {
        return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
      },
      convertDateToDayStandardFormat: (tour_starting_day) => {
        var timestampStr = tour_starting_day;
        var date = new Date(timestampStr);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var formattedDate;
        if (month < 10 && day < 10) {
          formattedDate = year + "-0" + month + "-0" + day;
        }
        else if (month < 10 && day >= 10) {
          formattedDate = year + "-0" + month + "-" + day;
        }
        else if (month >= 10 && day < 10) {
          formattedDate = year + "-" + month + "-0" + day;
        }
        else {
          formattedDate = year + "-" + month + "-" + day;
        }
        return formattedDate;
      },
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
app.use(express.static(path.join(__dirname, "resources", "utils")));
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "node_modules", "bootstrap", "dist")));
app.use(express.static(path.join(__dirname, "..", "node_modules", "material-icons", "iconfont")));

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// use cookie parser
app.use(cookieParser());

// use method override
app.use(methodOverride("_method"));

// import router
route(app);

// Thiết lập các sự kiện Socket.IO
let tourGuideLocations = [];

io.on("connection", (socket) => {
  console.log("A user connected");

  // Gửi dữ liệu hiện tại cho client mới kết nối
  socket.emit("location update", tourGuideLocations);

  // Lắng nghe sự kiện 'location update'
  socket.on("location update", (location) => {
    tourGuideLocations.push(location);
    io.emit("location update", tourGuideLocations); // Phát lại cho tất cả các client
  });

  // Sự kiện ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// start server
server.listen(PORT, () => console.log(`Application is running at: http://${HOST}:${PORT}`));
