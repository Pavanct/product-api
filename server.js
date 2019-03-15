var compression = require('compression')
const express = require("express");

const cors = require("cors");
const app = express();
app.use(compression());
const morgan = require('morgan');
var winston = require('./winston');
app.use(morgan('combined', { stream: winston.stream }));
//parse requests
// parse application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// parse application/json
//app.use(bodyParser.json());
app.use(cors());
//Enable CORS for all HTTP requests
/*app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Content-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});*/
//connecting to database
const config = require("./config");
const mongoose = require("mongoose");

//import routes after body parse
require('./product/product.routes.js')(app);

mongoose.Promise = global.Promise;

mongoose.connect(config.url, { useNewUrlParser: true })
.then(()=> {
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

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // add this line to include winston logging
    winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

