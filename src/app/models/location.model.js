const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Location = new Schema({
    name: { type: String },
    address: { type: String },
    description: { type: String, default: '' },
    coordinate: {
        longitude: { type: Number },
        latitude: { type: Number },
    },
    rating: { type: Number },
    ratingCount: { type: Number },
    type: { type: String },
    phoneNumber: { type: String, default: '' },
    website: { type: String, default: '' },
    region: { type: ObjectId },
    activity_list: { type: Array },
    boundary: { type: Array },
    created_at: { type: Date, default: () => Date.now() },
    updated_at: { type: Date, default: () => Date.now() },
});

module.exports = mongoose.model('Location', Location);
