const dotenv = require("dotenv");
dotenv.config();

const fs = require("fs");
const axios = require("axios");

let data = JSON.stringify({
  q: "khách sạn nghỉ dưỡng",
  hl: "vi",
  ll: "@11.940147238020286,108.45809725440188,11z",
  page: 2,
});

let config = {
  method: "post",
  url: "https://google.serper.dev/maps",
  headers: {
    "X-API-KEY": "b1ae1b2deb21e87e4e98f3a68674258eed59e61a",
    "Content-Type": "application/json",
  },
  data: data,
};

axios(config)
  .then((response) => {
    // Write response data to a JSON file synchronously
    try {
      fs.writeFileSync("./data/khach-san-nghi-duong-2.json", JSON.stringify(response.data));
      console.log("Response data has been saved to khu-nghi-duong.json");
    } catch (err) {
      console.error("Error writing file:", err);
    }
  })
  .catch((error) => {
    console.log(error);
  });
