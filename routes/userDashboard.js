const express = require('express')
const router = express.Router()
const UserProfile = require('../schema-models/User')



router.post('/',async (rea,res)=>{
    res.send('hii')
})


module.exports = router;