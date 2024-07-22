import express from "express";
import db from "./models/index.js";
import routes from './routes/api.js';
import dotenv from 'dotenv';
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";

dotenv.config()
const app = express()
const port = process.env.APP_PORT || 3001
// middleware ini berfungsi agar req.body menjadi json
app.use(express.urlencoded({ extended: true }))
// Middleware untuk parsing URL-encoded data
app.use(express.json())

// Test database connection
db.sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// // Sync database
db.sequelize.sync({alter: true})
    .then(() => console.log('Database synced...'))
    .catch(err => console.log('Error: ' + err));

app.use('/',routes);
app.use(errorHandlerMiddleware)
// not found
app.use(function (req, res, next) {
    res.status(404).json({
        'message': 'Not Found'
    })
})

app.listen(port, () => {
    console.log(`SERVER IS RUNNING http://localhost:${port}`)
})