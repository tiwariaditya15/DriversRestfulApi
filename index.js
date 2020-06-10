const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost/drivers', {useNewUrlParser: true, useUnifiedTopology: true});

// Middleware to trap body coming on request object
// First Middleware in stack
// app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Second middlware in stack
// To add /api before each route
app.use('/api', require('./routes/api'));

// Third middleware in stack
// To handle any error then send response to frontend 
// app.use(function(error, req, res, next){
//     res.status(422).send({error: error.message});
// });
app.listen(4000, () => {
    console.log('App has started.');
});
