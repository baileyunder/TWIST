// Init
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const http = require('http').Server(app);

// Set up mongodb
const MongoClient = require('mongodb').MongoClient;
const uri = 'mongodb+srv://admin:pvssw0rd@twist-cluster.8ppib.mongodb.net/TWIST?retryWrites=true&w=majority'; //Database String

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect(err => {
  const registrants = client.db("TWIST").collection("registrants");
  const sessions = client.db("TWIST").collection("sessions");
  client.close();
});

//Middlware Setup
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Set assets folder
app.use(express.static(__dirname + '/assets'));

// Routes
app.get('/', (req, res) => {
    res.render('index');
});

// Register Route
app.get('/register', (req, res) => {
    res.render('register');
});

// Successful Registration Route
app.get('/success', (req, res) => {
    res.render('success');
});

// Admin Login Route
app.get('/login', (req, res) => {
    res.render('login');
});

//App Routes below require tokens
// This route is for testing purposes only and should be removed before production. The admin page should only be accessible through a successful login.
app.get('/admin', (req, res) => {
    res.render('admin');
});

// This route is for testing purposes only and should be removed before production. The admin page should only be accessible through a successful login.
app.get('/edit', (req, res) => {
    res.render('edit');
});

// Open port 3000
app.listen(process.env.PORT || 3000, 
	() => console.log("Server is running..."));