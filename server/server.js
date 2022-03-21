const express = require("express");
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
require('dotenv').config();

const AuthRoute = require('./routes/auth');
const app = express();
// const cors = require("cors");
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// 
app.use(cookieParser());

// Database connection
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;
mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', (err) => {
  console.log(err);
  console.log("PLEASE MAKE SURE YOU'RE CONNECTED TO THE INTERNET")
})
db.once('open', () => {
  console.log('Database connection established');
})

// Routes
app.get('/check-auth', (req, res, next) => {
  try {
    const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
    console.log(decoded.email);
    res.json({
      message: 'Authenticated!',
      error: false
    });
  } catch (err) {
    res.json({
      message: 'Authentication error',
      error: true
    });
  }
})
app.use('/api/auth', AuthRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

