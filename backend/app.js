import express from "express";
import db from "./models/index.js";
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express()
const port = process.env.APP_PORT || 3001
// middleware ini berfungsi agar req.body menjadi json
// console.log(process.env.JWT_ACCESS_TOKEN_SECRET)
app.use(express.json());
// Middleware untuk parsing URL-encoded data
app.use(express.urlencoded({ extended: true }));

// Test database connection
db.sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// // Sync database
db.sequelize.sync()
    .then(() => console.log('Database synced...'))
    .catch(err => console.log('Error: ' + err));

app.use('/auth', authRoutes);

// not found
app.use(function (req, res, next) {
    res.status(404).json({
        'message': 'Not Found'
    })
})
app.listen(port, () => {
    console.log(`SERVER IS RUNNING http://localhost:${port}`)
})