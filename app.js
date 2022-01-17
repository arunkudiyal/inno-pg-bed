const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Manaage my routes
const homeRoute = require('./api/routes/home')
const registerRoute = require('./api/routes/register')

// CONNECT THE DATABASE
mongoose.connect('mongodb+srv://innomatics:Innomatics2021@cluster0.vpqqi.mongodb.net/userDb?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log(`Connection to database established successfully...`)
}).catch(err => {
    console.log(`db error ${err.message}`);
    process.exit(-1)
})

// Log the route in the console before it reaches to the app.use()
app.use(morgan('dev'))

// body-parser being used a middleware & we are configuring it
// response will be coming as urlencoded & in format of JSON
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// CORS
app.use(cors())

// USING THE ROUTES
app.use('/', homeRoute)
app.use('/register', registerRoute)

// HANDLE MY ERRORS -> a URL which is not a part of our API
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 400
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app