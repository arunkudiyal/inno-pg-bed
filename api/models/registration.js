const mongoose = require('mongoose')

const registrationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    number: Number,
    email: String,
    course: String,
    type: String,
    date: String,
    url: String
})

module.exports = mongoose.model('Registration', registrationSchema)