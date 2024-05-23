const express = require('express')
const router = express.Router()
const Trips = require('../schema-models/Trips')
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

router.post('/req', async (req, res) => {
    
    // console.log(req.body)
    const details = {
        destinationName: req.body.destinationName,
        pickupAdd: req.body.pickupAdd,
        destinationLat: req.body.destinationLat,
        destinationLon: req.body.destinationLon,
        pickupAddLat: req.body.pickupAddLat,
        pickupAddLon: req.body.pickupAddLon,
        status: false,
        name: req.body.name,
        number: req.body.number,
        date: req.body.date,
        time: req.body.time
    }
    // console.log(details)
    const result = await Trips.create(details)
    // console.log(result)
    res.status(200).json({ data: result })
})
router.get('/status/:userNumber/:tripId',async(req,res)=>{
    const status = await User.findOne({ 'tripsHistory._id': req.params.tripId })
    // console.log(status)
    if(status !== null){
        console.log('trip is accepted')
        console.log(status)
        return res.status(200).json({data:status})
        
        // res.status(200).json()
    }
    return res.status(204).json({message:"we are looking "})


    
})

router.get('/history/:userNumber',async (req,res)=>{
    const result  = await User.findOne({number:req.params.userNumber})
    if(result){
        return res.status(200).json({data:result})
    }
    return res.status(500).json({message:"internal server error "})


})



module.exports = router;