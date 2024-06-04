const multipleMongooseToObject = (mongooseArray) => {
    return mongooseArray.map((item) => item.toObject());
};

const mongooseToObject = (item) => {
    return item ? item.toObject() : item;
};
