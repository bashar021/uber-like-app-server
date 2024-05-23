//schema to for storing the data into db
const mongoose = require('mongoose')
const {Schema} = mongoose;

const UserSchema = new Schema({
    name:{type:String,required:true},
    email :{type:String,required:true,unique:true},
    number:{type:String,minLength:10,required:true},
    tripsHistory:[{
        destinationName: { type: String, required: true },
        pickupAdd: { type: String, required: true },
        destinationLat: { type: String, required: true },
        destinationLon: { type: String, required: true },
        pickupAddLat: { type: String, required: true },
        pickupAddLon: { type: String, required: true },
        status: { type: String, required: true  },
        driverName: { type: String, required: true },
        driverNumber: { type: String, minLength: 10, required: true },
        vehicleNo:{type:String,required:true},
        date: { type: Date, required: true },
        time: { type: String, required: true }
    }],
    date: { type: Date, default: Date.now }
});
const User = mongoose.model('user', UserSchema);
module.exports = User