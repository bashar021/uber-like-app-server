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




module.exports = router;