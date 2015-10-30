/**
 * Project: coders4africa
 * Created by Haythem Horbit on 29/10/2015.
 */

//define Global APP object
console.log("starting Server...")
APP={};
//loading main config
console.log("loading Config...")
APP.CONFIG=require("./config/config.js").loadConfig();
//Link DB to APP
APP.DB={}
require('./utils/connectionUtils')(APP.DB);

APP.DB.connect(APP.CONFIG.DB);

console.log("Loading Models")

var modelsPath = require("path").join(__dirname, "models");
require("fs").readdirSync(modelsPath).forEach(function(file) {
    console.log("Loading MODEL :"+ file)
 require(modelsPath+"/"+file)(APP);
});

var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var methodOverride = require('method-override');
var session = require('express-session');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var compress = require('compression');
var app = express();

var jwt = require("express-jwt");
var cors = require('cors');
var validator = require('express-validator');


var errors = require('./utils/errors');
app.use(logger('dev'));
APP.APIPATH = APP.CONFIG.API.PATH + "/v" + APP.CONFIG.API.version;
console.log(APP.APIPATH)
var accessiblePathList = [

    { url:  APP.APIPATH + '/login', methods: ['POST','GET']  },
    { url:  APP.APIPATH + '/registration', methods: ['POST']  }
]

app.use(methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
//  app.use(multer());
app.use(compress());

// Middleware attachment
app.use(cors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Origin,X-Requested-With,Content-Type,Accept,Authorization'
}));
app.use(bodyParser.json());
app.use(validator());
app.use(jwt({
    secret: APP.CONFIG.API.secret,requestProperty: 'auth',
    getToken: function fromHeaderOrQuerystring(req) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        } else if (req.query && req.query.token) {
            return req.query.token;
        }
        return null;
    }

}).unless(function(req) {
    return (
        req.originalUrl === APP.APIPATH + '/user' && req.method === 'POST' ||
        req.originalUrl === APP.APIPATH + '/login' && req.method === 'POST'
    );
}));//.unless({path: accessiblePathList}));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send("welcome Api V1"+ APP.CONFIG.version)
});





var routesPath = require("path").join(__dirname, "routes");
require("fs").readdirSync(routesPath).forEach(function (file) {
   require(routesPath + "/" + file)(app);

});

// Handle 403 error
app.use(errors.forbiddenError);
// Handle 404 error
//app.use(errors.notFoundError);



// Handle 500 error
//app.use(errors.serverError);


app.listen(APP.CONFIG.API.PORT, function () {
    console.log('listening on *:' + APP.CONFIG.API.PORT);
});