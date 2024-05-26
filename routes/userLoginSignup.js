const express = require('express')
const router = express.Router()
const UserProfile = require('../schema-models/User')


router.post('/login', async (req, res) => {
    // console.log(req.body)
    try {
        const data = await UserProfile.findOne({ number: req.body.number })
        if (data) {
            return res.status(200).json({ data: data })
        } else {
            return res.status(401).json({ message: 'please login' })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
    }

})
router.post('/signup',async (req,res)=>{
    // name:{type:String,required:true},
    // email :{type:String,required:true,unique:true},
    // number:{type:String,minLength:10,required:true},
    // password:{type:String,minLength:10,required:true},
    
    try {
        const data  = {name:req.body.name,email:req.body.email,number:req.body.number,password:req.body.password}
        const result = await UserProfile.create(data)
        if (result) {
            return res.status(200).json({ data: result })
        } 
        return res.status(500).json({ error: error })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error })
    }
})




module.exports = router;