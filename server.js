const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//parse requests
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//connecting to database
const config = require("./config");
const mongoose = require("mongoose");

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
app.listen(3000, ()=>{
    console.log(`Server is listening in port 3000`);
});



