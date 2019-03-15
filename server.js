const express = require("express");
const bodyParser = require("body-parser");

const app = express();
require('./product/product.routes.js')(app);
//parse requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Enable CORS for all HTTP requests
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Content-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//connecting to database
const config = require("./config");
const mongoose = require("mongoose");


mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
    useNewUrlParser: true
}).then(()=> {
    console.log("Connected to database successfully")
}).catch(err => {
    console.log("could not connect to database. Exiting now...", err);
    process.exit();
});

//default route
app.get('/',(req, res)=> {
    res.json({"message":"Welcome to Products API"})
});

//listen at port 3000
app.listen(config.serverport, ()=>{
    console.log(`Server is listening in port ${config.serverport}`);
});



