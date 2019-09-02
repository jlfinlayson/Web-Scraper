// Require Express Package 
var express = require("express");
// Require Mongoose Package 
var mongoose = require("mongoose");
// Require Express-Handlebars Package 
var exphbs = require("express-handlebars");

var PORT = process.env.PORT || 3000;

var app = express();

// Express
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
var routes = require("./routes/routes");
app.use(routes);

// Mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Start Server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!")
});