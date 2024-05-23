const express = require('express')
const router = express.Router()
const Trips = require('../schema-models/Trips')
const Drivers = require('../schema-models/Driver.js')
const User = require('../schema-models/User.js')

// destinationName:{required:true},
// pickupAdd:{required:true},
// destinationLat :{required:true},
// destinationLon:{required:true},
// pickupAddLat:{required:true},
// pickupAddLon:{required:true},
// status:{type:Bool,default:false,required:true},
// name:{type:String,required:true},
// number:{type:String,minLength:10,required:true},
// date: { type: Date, default: Date.now }
// time: { type: String,required:true }
router.use(express.json());
router.get('/drive/req/:lat/:lon', async (req, res) => {
    // const { lat, lon } = req.query;
    // console.log(req.params.lat)
    // console.log(req.params.lon)
    const lat = req.params.lat
    const lon = req.params.lon
    try {
        const trips = await Trips.find({
            pickupAddLat: { $gte: parseFloat(lat) - 0.11, $lte: parseFloat(lat) + 0.11 },
            pickupAddLon: { $gte: parseFloat(lon) - 0.11, $lte: parseFloat(lon) + 0.11 }
        }).limit(1);

        if (trips.length > 0) {
            // console.log(trips[0])
           return  res.status(200).send(trips[0]);
        } else {
            console.log('no trips found nearby')
            return res.status(404).send({ message: 'No trips found nearby' });

        }
    } catch (error) {
        console.log('inernal server error ')
        return res.status(500).send({ error: 'Internal Server Error' });
    }
    

    // res.status(200).json({ data: 'sucesss' })
})
// router.get('drive/req/accept',async (req,res)=>{

// })
router.get('/drive/accept/:tripId/:driverNumber', async (req, res) => {
  const tripId = req.params.tripId
  console.log(tripId)
  console.log(req.params.driverNumber)
//   driverName: { type: String, required: true },
//   driverNumber: { type: String, minLength: 10, required: true },
//   vehicleNo:{type:String,required:true},

  try {
    const trip = await Trips.findById({_id:tripId})
    console.log(trip)
    const driver = await Drivers.findOneAndUpdate({number:req.params.driverNumber},{ '$push': { 'tripsHistory': trip } }, { new: true })
    // console.log(driver)
    const result = await Trips.findByIdAndDelete({_id:tripId});
    const newTrip = {
        ...trip.toObject(),
        driverName: driver.name,
        driverNumber:driver.number,
        vehicleNo:driver.vehicleNo,
       
    }
    console.log('new trip')
    console.log(newTrip)
   
    const user = await User.findOneAndUpdate({number:trip.number},{ '$push': { 'tripsHistory': newTrip} }, { new: true })
    // console.log(result)
    res.status(200).json({message:"sucess"})
  } catch (error) {
    console.log(error)
    res.status(500).send('Error accepting trip');
  }
});


router.post('/login',async(req,res)=>{
    // console.log(req.body)
    res.status(200).json({message:'sucess'})
})

router.get('/drive/history/:userNumber',async (req,res)=>{
  const result  = await Drivers.findOne({number:req.params.userNumber})
  if(result){
      return res.status(200).json({data:result})
  }
  return res.status(500).json({message:"internal server error "})


})


module.exports = router;