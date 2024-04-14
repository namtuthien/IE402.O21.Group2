const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Polygon = new Schema({
    _id: { type: ObjectId },
    points: [
        {
            longtitude: { type: String },
            latitude: { type: String },
        },
    ],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Polygon', Polygon);
