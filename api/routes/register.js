const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Registration = require('../models/registration')  

router.post('/', (req, res) => {
    dateObj = new Date().toLocaleString(undefined, {timeZone: 'Asia/Kolkata'})
    
    const registration = new Registration({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        number: req.body.number,
        email: req.body.email,
        course: req.body.course,
        type: req.body.type,
        date: dateObj,
        url: req.body.url
    })

    registration
    .save()
    .then(result => {
        res.status(200).json(result)
        console.log('Message from MongoDB : ' + result)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
})

router.get('/', (req, res) => {
    res.status(200).json({
        message: "Handling GET requests to /register"
    })
}) 

module.exports = router