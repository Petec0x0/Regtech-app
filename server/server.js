const express = require("express");
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
})
db.once('open', () => {
  console.log('Database connection established');
})

// Routes
app.use('/api/auth', AuthRoute);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

