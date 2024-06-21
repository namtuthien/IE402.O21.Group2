const dotenv = require("dotenv");
const Rating = require("../src/app/models/rating.model");
dotenv.config();

const { db } = require("../src/config");
db.connect();
const mongoose = require("mongoose");

const tourIds = [
    '66699ec8a689576a4e9c4ac0',
    '66699ec8a689576a4e9c4aca',
    '66699ec8a689576a4e9c4ac4',
]

const customerIds = [
    '661fe62db3060de4f1801e3b',
    '661fe62db3060de4f1801e3c',
    '661fe62db3060de4f1801e3d',
    '661fe62db3060de4f1801e3e',
    '661fe62db3060de4f1801e42',
    '661fe62db3060de4f1801e41',
    '661fe62db3060de4f1801e43',
    '661fe62db3060de4f1801e45',
    '661fe62db3060de4f1801e44',
    '661fe62db3060de4f1801e46',
    '661fe62db3060de4f1801e48',
    '661fe62db3060de4f1801e49',
    '661fe62db3060de4f1801e4b',
    '661fe62db3060de4f1801e4d',
    '661fe62db3060de4f1801e4c',
]

const ratingDetail = "Tour này xứng đáng với số tiền mà tôi bỏ ra."

const createRating = () => {
    const ratings = [];
    for (let i = 0; i < tourIds.length; i++) {
        for (let j = i * 3; j < i * 3 + 3; j++) {
            let rating = {
                customer: new mongoose.Types.ObjectId(customerIds[j]),
                tour: new mongoose.Types.ObjectId(tourIds[i]),
                rating_score: Math.floor(3 + Math.random() * 3),
                rating_detail: ratingDetail,
            }
            ratings.push(rating)
        }
    }
    return ratings
}

const ratings = createRating();
Rating.create(ratings)
  .then((data) => {
    console.log("Thành công. Rating đã được thêm vào cơ sở dữ liệu", data);
  })
  .catch((err) => {
    console.log("Lỗi.", err);
  });