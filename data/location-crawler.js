// set environment
const dotenv = require("dotenv");
dotenv.config();

// import libs
const fs = require("fs");
const axios = require("axios");

// serpapi dev
// // config search params
// let data = JSON.stringify({
//   q: "Thắng cảnh",
//   hl: "vi",
//   ll: "@11.940147238020286,108.45809725440188,11z",
//   page: 1,
// });

// // config fetch data
// let config = {
//   method: "post",
//   url: "https://google.serper.dev/maps",
//   headers: {
//     "X-API-KEY": process.env.SERP_API_DEV_KEY,
//     "Content-Type": "application/json",
//   },
//   data: data,
// };

// // fetch data
// axios(config)
//   .then((response) => {
//     try {
//       console.log(response);
//       fs.writeFileSync("./data/jsons/test.json", JSON.stringify(response.data));
//       console.log("Response data has been saved to khu-nghi-duong.json");
//     } catch (err) {
//       console.error("Error writing file:", err);
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// serpapi
// Khóa API của bạn
const apiKey = process.env.SERP_API_KEY;

// Thông tin tìm kiếm
const searchQuery = "Khách sạn nghỉ dưỡng";
const language = "vi";
const latitude = 11.940147238020286;
const longitude = 108.45809725440188;
const zoom = "11z";
const page = 1;

// Tạo URL yêu cầu API
const url = `https://serpapi.com/search.json?engine=google_maps&q=${searchQuery}&hl=${language}&ll=@${latitude},${longitude},${zoom}&page=${page}&api_key=${apiKey}&type=search`;

const fileName = "home-stay-2";

// Gửi yêu cầu API và lưu kết quả vào tệp JSON
axios
  .get(url)
  .then((response) => {
    const data = response.data;

    // Lưu kết quả vào tệp JSON
    fs.writeFile(`./data/jsons/${fileName}.json`, JSON.stringify(data), (error) => {
      if (error) {
        console.error("Lỗi khi lưu tệp JSON:", error);
      } else {
        console.log(`Kết quả đã được lưu vào tệp ${fileName}.json`);
      }
    });
  })
  .catch((error) => {
    console.log("Lỗi khi gửi yêu cầu API:", error);
  });
