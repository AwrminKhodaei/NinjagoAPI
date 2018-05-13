const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise=global.Promise;

app.use(express.static('public'));
app.use(bodyParser.json());


// Init routes
app.use('/api',require('./routes/api'));


// Error handelling middleware
app.use(function(err,req,res,next){
    // console.log(err);
    res.status(422).send({
        error:err.message
    })
});



// port for both enviroment setup and local server
const port = process.env.port=8080;


// Listen for chanegs
app.listen(port || 8080,function(){
    console.log('Listening for requests on port ' + port);
});


