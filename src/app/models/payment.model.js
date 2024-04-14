const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Payment = new Schema({
    _id: { type: ObjectId },
    user_id: { type: ObjectId },
    tour_id: { type: ObjectId },
    amount: { type: Number },
    total_price: { type: Number },
    note: { type: String },
    payment_gateway: { type: String },
    status: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Payment', Payment);
