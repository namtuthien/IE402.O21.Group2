module.exports = {
  multipleMongooseToObject: function (mongooseArray) {
    return mongooseArray.map((item) => item.toObject());
  },
  mongooseToObject: function (item) {
    return item ? item.toObject() : item;
  },
};
