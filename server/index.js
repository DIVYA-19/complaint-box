const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./app/config/config.js')
const routes = require('./app/routes')
const authRoutes = require('./app/routes/auth')

require("dotenv").config()
const app = express();

mongoose.connect(config.uri).catch(err => console.log(err))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(cors())

app.use("/api", ...routes);

app.use('/', (req, res) => {
    res.send("hello")
})

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`)
})