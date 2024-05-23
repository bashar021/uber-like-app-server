"strict"
const express = require('express')
const app = express()
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken'); // for user authentication 
var dotenv = require('dotenv').config();
var cookieParser = require('cookie-parser')
const ConnectToDb = require('./db.js') // importing mongodb connection 
const cors = require('cors');



const port = process.env.PORT || 8080


// app.use(cors({ origin: false })); //origin false means  that blocked all teh other origin requests 
// app.use(cors({ origin: process.env.CLIENT_URL,methods: ['GET', 'POST','PUT', 'DELETE'],credentials: true }));
// app.use(cors({ credentials: true }))
app.use(cors());

// app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(express.json()) 
// app.use('/static', express.static((path.join(__dirname, 'public'))))
// app.set('views', path.join(__dirname, 'views'));  


// routes 
app.use('/ride',require('./routes/userLoginSignUp'))
app.use('/user/dashboard',require('./routes/userDashboard'))
app.use('/user/ride',require('./routes/userTrips.js'))
app.use('/driver',require('./routes/driver.js'))




ConnectToDb()  // calling the mongodb connection function exported from the db.js





app.get('/', (req, res) => {
    res.send('hii')
})

app.listen(port, () => {
    console.log(`app is running on ${port} `)
})