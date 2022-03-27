const express = require("express");
const path = require("path");
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const mongoose = require("mongoose");
require('dotenv').config();
const verifyClient = require('./middlewares/verifyClient');
const AuthRoute = require('./routes/auth');
const CustomerRoute = require('./routes/customer');
const CustomerOnboardingRoute = require('./routes/customerOnboarding');

const app = express();
// const cors = require("cors");
// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));

// Increse file upload limit size
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// middleware for parsing cookie from the request
app.use(cookieParser());
//When you navigate to the root page, it would use the built react-app
app.use(express.static(path.resolve(__dirname, "../client/build")));
// make a directory accessible as a public dir
app.use('/assets', express.static('assets'));
app.use('/uploads', express.static('uploads'));


// Database connection
// Store the DB_HOST value as a variable
const DB_HOST = process.env.DB_HOST;
mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('error', (err) => {
  console.log("PLEASE MAKE SURE YOU'RE CONNECTED TO THE INTERNET (DATABASE IS ON A REMOTE SERVER)")
  console.log(err);
})
db.once('open', () => {
  console.log('Database connection established');
})


// Routes
app.use('/api/auth', AuthRoute);
app.use('/api/customer', verifyClient, CustomerRoute);
app.use('/api/onboarding', CustomerOnboardingRoute);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

