//schema to for storing the data into db
const mongoose = require('mongoose')
const {Schema} = mongoose;

const TripsSchema = new Schema({
    destinationName: { type: String, required: true },
    pickupAdd: { type: String, required: true },
    destinationLat: { type: String, required: true },
    destinationLon: { type: String, required: true },
    pickupAddLat: { type: String, required: true },
    pickupAddLon: { type: String, required: true },
    status: { type: Boolean, default: false },
    name: { type: String, required: true },
    number: { type: String, minLength: 10, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true }
});
const Trips = mongoose.model('trip', TripsSchema);
module.exports = Trips