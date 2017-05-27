var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan")
var Promise = require("bluebird");

//Set up mongoose promise
mongoose.Promise = Promise;

//Init app and set port
var app = express();
var PORT = process.env.PORT || 8080;

//Set up logger
app.use(logger("dev"));
//Set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
	type: "application/vnd.api+json"
}));

//Set render engine to PUG
app.set('view engine', 'pug');

//Open public for CSS and JS
app.use(express.static("./public"));

///////Routes Section
//HTML
//API
require("./routes/html-routes.js")(app);

////Init mongoose
//
mongoose.connect("mongodb://localhost/scrappy");
var db = mongoose.connection;
db.on("error", function (error) {
	console.log("Mongoose Error: ", error);
});

//////Finish server set up by connecting to mongoose
//
db.once("open", function () {
	app.listen(PORT, function () {
		console.log("App listening on PORT " + PORT);
		require("./methods/scrape").scrape();
	});
});