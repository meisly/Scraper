require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const logger = require("morgan");
const mongoose = require("mongoose");
const scrape = require("./scrape");


const session = require("express-session");


const storage = process.env.REDIS_URL;
let redis, redisStore, client;

if(storage){
  redis = require("redis");
  redisStore = require("connect-redis")(session);
  client = redis.createClient(process.env.REDIS_URL);

  client.on("connect", function(){
    scrape.getJS();
    scrape.getProgramming();
    scrape.getTech();
  })
}



setInterval(scrape.getJS, 60*60*1000);
setInterval(scrape.getTech, 60*60*1000);
setInterval(scrape.getProgramming, 60*60*1000);

//Import all models
var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

app.use(
  session({
    name: "sid",
    secret: "keyboard cat",
    store: storage ? new redisStore({client: client}) : this.defaultConfiguration,
    cookie: {  sameSite: true, maxAge: 6000000 },
    saveUninitialized: false,
    resave: false
  })
);
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

module.exports = app;


