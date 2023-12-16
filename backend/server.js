require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workoutsRouter')
const mongoose = require('mongoose')
const app = express()   // create express app   

// middleware
app.use(express.json())  // parse json bodies into JS objects
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.get('/', (req, res) => {
    res.json({ mssg: 'This is home' })
})
app.use('/workouts', workoutRoutes)
app.use('/workouts/:id', workoutRoutes)

// connect to mongodb & listen for requests
mongoose.connect(process.env.DB_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db and server started on port: ' + process.env.PORT + '...')
        })  // server listens on port 5000
    })
    .catch((err) => {console.log(err)
    })

