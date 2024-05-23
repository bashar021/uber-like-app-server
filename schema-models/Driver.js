//schema to for storing the data into db
const mongoose = require('mongoose')
const {Schema} = mongoose;

const DriverSchema = new Schema({
    name:{type:String,required:true},
    email :{type:String,required:true,unique:true},
    number:{type:String,minLength:10,required:true},
    vehicle:{type:String,required:true},
    vehicleNo:{type:String,required:true},
    tripsHistory:[{
        destinationName: { type: String, required: true },
        pickupAdd: { type: String, required: true },
        destinationLat: { type: String, required: true },
        destinationLon: { type: String, required: true },
        pickupAddLat: { type: String, required: true },
        pickupAddLon: { type: String, required: true },
        status: { type: String, required: true  },
        name: { type: String, required: true },
        number: { type: String, minLength: 10, required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true }
    }],
    date: { type: Date, default: Date.now }
});
const Driver = mongoose.model('driver', DriverSchema);
module.exports = Driver