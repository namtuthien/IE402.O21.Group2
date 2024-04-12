// set environment
const dotenv = require("dotenv");
dotenv.config();

// import libs
const fs = require("fs");
const axios = require("axios");

// config search params
let data = JSON.stringify({
  q: "Thắng cảnh",
  hl: "vi",
  ll: "@11.940147238020286,108.45809725440188,11z",
  page: 1,
});

// config fetch data
let config = {
  method: "post",
  url: "https://google.serper.dev/maps",
  headers: {
    "X-API-KEY": process.env.SERP_API_KEY,
    "Content-Type": "application/json",
  },
  data: data,
};

// fetch data
axios(config)
  .then((response) => {
    try {
      fs.writeFileSync("./data/jsons/thang-canh.json", JSON.stringify(response.data));
      console.log("Response data has been saved to khu-nghi-duong.json");
    } catch (err) {
      console.error("Error writing file:", err);
    }
  })
  .catch((error) => {
    console.log(error);
  });
